/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

this.EXPORTED_SYMBOLS = ["FormLikeFactory"];

const { classes: Cc, interfaces: Ci, results: Cr, utils: Cu } = Components;

/**
 * A factory to generate FormLike objects that represent a set of related fields
 * which aren't necessarily marked up with a <form> element. FormLike's emulate
 * the properties of an HTMLFormElement which are relevant to form tasks.
 */
let FormLikeFactory = {
  _propsFromForm: [
    "action",
    "autocomplete",
    "ownerDocument",
  ],

  /**
   * Create a FormLike object from a <form>.
   *
   * @param {HTMLFormElement} aForm
   * @return {FormLike}
   * @throws Error if aForm isn't an HTMLFormElement
   */
  createFromForm(aForm) {
    if (!(aForm instanceof Ci.nsIDOMHTMLFormElement)) {
      throw new Error("createFromForm: aForm must be a nsIDOMHTMLFormElement");
    }

    let formLike = {
      elements: [...aForm.elements],
      rootElement: aForm,
    };

    for (let prop of this._propsFromForm) {
      formLike[prop] = aForm[prop];
    }

    this._addToJSONProperty(formLike);

    return formLike;
  },

  /**
   * Create a FormLike object from an <input> in a document.
   *
   * If the field is in a <form>, construct the FormLike from the form.
   * Otherwise, create a FormLike with a rootElement (wrapper) according to
   * heuristics. Currently all <input> not in a <form> are one FormLike but this
   * shouldn't be relied upon as the heuristics may change to detect multiple
   * "forms" (e.g. registration and login) on one page with a <form>.
   *
   * Note that two FormLikes created from the same field won't return the same FormLike object.
   * Use the `rootElement` property on the FormLike as a key instead.
   *
   * @param {HTMLInputElement} aField - a field in a document
   * @return {FormLike}
   * @throws Error if aField isn't a password or username field in a document
   */
  createFromField(aField) {
    if (!(aField instanceof Ci.nsIDOMHTMLInputElement) ||
        !aField.ownerDocument) {
      throw new Error("createFromField requires a field in a document");
    }

    if (aField.form) {
      return this.createFromForm(aField.form);
    }

    let doc = aField.ownerDocument;
    let elements = [];
    for (let el of doc.documentElement.querySelectorAll("input")) {
      if (!el.form) {
        elements.push(el);
      }
    }
    let formLike = {
      action: doc.baseURI,
      autocomplete: "on",
      // Exclude elements inside the rootElement that are already in a <form> as
      // they will be handled by their own FormLike.
      elements,
      ownerDocument: doc,
      rootElement: doc.documentElement,
    };

    this._addToJSONProperty(formLike);
    return formLike;
  },

  /**
   * Add a `toJSON` property to a FormLike so logging which ends up going
   * through dump doesn't include usless garbage from DOM objects.
   */
  _addToJSONProperty(aFormLike) {
    function prettyElementOutput(aElement) {
      let idText = aElement.id ? "#" + aElement.id : "";
      let classText = "";
      for (let className of aElement.classList) {
        classText += "." + className;
      }
      return `<${aElement.nodeName + idText + classText}>`;
    }

    Object.defineProperty(aFormLike, "toJSON", {
      value: () => {
        let cleansed = {};
        for (let key of Object.keys(aFormLike)) {
          let value = aFormLike[key];
          let cleansedValue = value;

          switch (key) {
            case "elements": {
              cleansedValue = [];
              for (let element of value) {
                cleansedValue.push(prettyElementOutput(element));
              }
              break;
            }

            case "ownerDocument": {
              cleansedValue = {
                location: {
                  href: value.location.href,
                },
              };
              break;
            }

            case "rootElement": {
              cleansedValue = prettyElementOutput(value);
              break;
            }
          }

          cleansed[key] = cleansedValue;
        }
        return cleansed;
      }
    });
  },
};