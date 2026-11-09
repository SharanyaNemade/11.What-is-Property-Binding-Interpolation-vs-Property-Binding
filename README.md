# Angular21


Property Binding in Angular 21 – Complete Guide with Examples
Property Binding is one of the most important concepts in Angular templates. It allows developers to dynamically set HTML element properties using component data.

In Angular 21, Property Binding works with the same fundamental syntax used in previous Angular versions. The important concepts are square brackets [], one-way data binding, DOM properties, and dynamic UI updates.

Let's understand it step by step with practical examples, comparisons, common mistakes, and interview questions.

1. What is Property Binding in Angular?
Property Binding is a technique used to bind a component's TypeScript property to an HTML element's DOM property.

Whenever the component property changes, Angular updates the corresponding DOM property.

In simple words:

Property Binding allows us to pass dynamic values from a component class to HTML element properties.

For example:


typescript
export class AppComponent {
  username = 'John';
}
HTML:

<input [value]="username">
Output:

LIVE OUTPUT EXAMPLE

John
Input displays the value supplied by the component.
Here:

username is a component property.

[value] represents Property Binding.

Angular assigns the value of username to the input element's DOM value property.

2. Property Binding Syntax in Angular 21
The syntax is:

<element [property]="expression">
Another equivalent syntax is:

<element bind-property="expression">
However, square bracket syntax is more commonly used.

Real examples
Example 1: Input value

<input [value]="username">
Example 2: Button disabled

<button [disabled]="isDisabled">
  Submit
</button>
Example 3: Image source

<img [src]="imageUrl">
Example 4: Input readonly

<input [readonly]="isReadOnly">
Example 5: Dynamic CSS class

<div [class.active]="isActive">
  Welcome to Angular
</div>
Example 6: Dynamic style

<p [style.color]="textColor">
  Angular Property Binding
</p>
Important points
Property Binding uses square brackets [].

It provides one-way data binding.

Data flows from component class to the template.

It can bind strings, numbers, booleans, objects, and other compatible values.

Angular updates the DOM when the bound expression changes.

3. Property Binding vs Interpolation – Key Differences
Both Property Binding and Interpolation are used to display dynamic data in Angular templates, but they work differently.

Feature

Property Binding

Interpolation

Syntax

[value]="name"

{{name}}

Purpose

Sets element properties

Converts values to text

Data type

Preserves compatible types

Produces a string

Boolean properties

Supports boolean values

Converts values to text

Main usage

DOM properties

Displaying text

Data flow

Component → DOM

Component → rendered text

Example using Interpolation
TypeScript:


typescript
export class AppComponent {
  username = 'John';
}
HTML:

<h2>{{ username }}</h2>
Output:

John
Text rendered using interpolation.
Example using Property Binding
HTML:

<input [value]="username">
Angular assigns the actual string value to the input's value property.

Remember:

Use Interpolation when you want to display text.

Use Property Binding when you want to set an HTML or DOM property.

4. Why Does Interpolation Fail with Boolean Properties?
This is one of the most frequently asked Angular interview questions.

Consider this example:


typescript
export class AppComponent {
  isDisabled = false;
}
Incorrect approach: Interpolation
<button disabled="{{ isDisabled }}">
  Submit
</button>
You might expect the button to be enabled because isDisabled is false.

However, interpolation converts the expression into a string.

The result is effectively:

<button disabled="false">
  Submit
</button>
The problem: In HTML, the presence of the disabled attribute disables the button. The string "false" does not mean that the attribute is absent.

Correct approach: Property Binding
<button [disabled]="isDisabled">
  Submit
</button>
Now Angular assigns the actual boolean value to the DOM property.

true → Button disabled.

false → Button enabled.

Try it yourself – Angular 21

isDisabled = false

Enabled
Demonstrates the actual boolean behavior of property binding.
Interview takeaway: Use Property Binding for boolean DOM properties such as disabled, readonly, checked, and required.

Angular's official documentation explains the difference between binding DOM properties and HTML attributes. 

Angular
+1

5. Disable / Enable Button Using Property Binding
This is a practical real-world example.

Suppose we have a registration form. We want to disable the Submit button until the user enters a valid name.

TypeScript – app.component.ts

typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  username = '';

  isButtonDisabled = true;

  onUsernameChange(value: string) {
    this.username = value;
    this.isButtonDisabled = value.trim().length === 0;
  }

  submitForm() {
    alert('Form submitted successfully!');
  }
}
HTML – app.component.html
<h2>Registration Form</h2>

<input
  type="text"
  placeholder="Enter username"
  [value]="username"
  (input)="onUsernameChange($any($event.target).value)"
>

<button
  [disabled]="isButtonDisabled"
  (click)="submitForm()"
>
  Submit
</button>
How does it work?
Initially, isButtonDisabled is true.

The Submit button is disabled.

When the user enters a username, the input event executes.

Angular updates isButtonDisabled.

If the username is not empty, the button becomes enabled.

Best practice: In Angular 21, you can also use signals and derive the disabled state automatically.


typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <input
      #usernameInput
      placeholder="Enter username"
      (input)="username.set(usernameInput.value)"
    >

    <button [disabled]="isEmpty()">
      Submit
    </button>
  `
})
export class AppComponent {
  username = signal('');

  isEmpty = computed(() => !this.username().trim());
}
Here:

signal('') stores the username.

computed() derives whether the input is empty.

[disabled] automatically updates when the signal changes.

This is a clean reactive approach for Angular 21.

6. Readonly Input Example – Interpolation vs Property Binding
Suppose we want to make an input field readonly dynamically.

Component TypeScript

typescript
export class AppComponent {
  isReadOnly = true;
}
Approach 1: Interpolation
<input readonly="{{ isReadOnly }}">
When isReadOnly is true, the input becomes readonly.

But when it is false, interpolation produces "false", which is still a present HTML boolean attribute.

Therefore, the input may remain readonly.

Approach 2: Property Binding
<input [readonly]="isReadOnly">
This works correctly:

isReadOnly

Input behavior

true

Readonly

false

Editable

Try readonly property binding

Readonly: true

Read-only
Angular 21 Property Binding
The example above illustrates the readonly state concept; use [readonly]="isReadOnly" in your Angular template.
Actual Angular implementation:

<input
  type="text"
  [value]="'Angular Developer'"
  [readonly]="isReadOnly"
>
7. Image Binding Using Property Binding
Property Binding is commonly used to dynamically change image sources.

TypeScript

typescript
export class AppComponent {

  imageUrl = 'assets/angular-logo.png';

  imageAlt = 'Angular Logo';

}
HTML
<img
  [src]="imageUrl"
  [alt]="imageAlt"
  width="200"
>
Angular dynamically assigns:

Image URL to the src property.

Alternative text to the alt property.

Change image dynamically

typescript
export class AppComponent {

  imageUrl = 'assets/angular-logo.png';

  changeImage() {
    this.imageUrl = 'assets/typescript-logo.png';
  }
}
HTML:

<img [src]="imageUrl" alt="Technology logo">

<button (click)="changeImage()">
  Change Image
</button>
When the button is clicked, Angular updates the image source.

Angular | Enterprise Front-End Development - Adaca
 
Generics in TypeScript. Generics are a powerful feature in… | by Muhammad Adeel | Medium
 
Best practice: Use [src] rather than manually manipulating image elements through JavaScript.

For optimized image loading, Angular also provides the NgOptimizedImage directive, which supports [ngSrc]. 

Angular

8. When to Use Property Binding and When to Use Interpolation?
This is a very important distinction.

Requirement

Recommended syntax

Display username

{{ username }}

Display employee name

{{ employeeName }}

Set input value

[value]="username"

Disable button

[disabled]="isDisabled"

Set readonly state

[readonly]="isReadOnly"

Set checkbox state

[checked]="isChecked"

Set image URL

[src]="imageUrl"

Set CSS class

[class.active]="isActive"

Set CSS style

[style.color]="textColor"

Bind component input

[user]="currentUser"

Simple rule to remember
Use Interpolation for displaying text:

<h1>Welcome {{ username }}</h1>
Use Property Binding for setting properties:

<input [value]="username">
<button [disabled]="isDisabled">Save</button>
Important interview clarification
Interpolation is not restricted to text nodes.

For example:

<img src="{{ imageUrl }}">
Angular supports this and treats interpolation in a property context as a property binding, but converts the expression to a string.

Therefore, the actual difference is not simply that interpolation cannot work with properties.

The important distinction is:

Interpolation converts the expression to a string.

Property Binding passes the expression's value to the target property.

This matters when the target expects a boolean, number, object, or another non-string value. 

Angular
+1

9. Common Mistakes Developers Make in Property Binding
Here are mistakes you should avoid when working with Angular 21.

Mistake 1: Forgetting square brackets
Incorrect:

<button disabled="isDisabled">Submit</button>
Correct:

<button [disabled]="isDisabled">Submit</button>
Without square brackets, Angular treats the value as a static string.

Mistake 2: Using interpolation for boolean properties
Incorrect:

<input readonly="{{ isReadOnly }}">
Correct:

<input [readonly]="isReadOnly">
Mistake 3: Putting interpolation inside Property Binding
Incorrect:

<input [value]="{{ username }}">
Correct:

<input [value]="username">
Remember: Property Binding already evaluates the expression. You don't need curly braces.

Mistake 4: Passing a string instead of a boolean
Incorrect:

<button [disabled]="'false'">Submit</button>
Correct:

<button [disabled]="false">Submit</button>
The first example passes a non-empty string, which is truthy when interpreted as a boolean.

Mistake 5: Confusing property binding with attribute binding
These are different:

<button [disabled]="isDisabled">Submit</button>
<button [attr.disabled]="isDisabled ? '' : null">
  Submit
</button>
[disabled] sets the DOM property.

[attr.disabled] sets or removes the HTML attribute.

For boolean DOM properties, prefer Property Binding.

Mistake 6: Binding to a property that does not exist
Incorrect:

<div [unknownProperty]="value"></div>
Angular may report an unknown property binding error.

Use a valid DOM property, directive input, or component input.

If you need to set a plain HTML attribute without a corresponding DOM property, use:

<div [attr.role]="userRole"></div>
10. Angular 21 Property Binding Best Practices
Follow these practices when developing Angular applications.

Use Property Binding for boolean values.

<button [disabled]="isDisabled">Save</button>
Use Interpolation for displaying text.

<h2>{{ employeeName }}</h2>
Prefer signals for reactive component state when appropriate.


typescript
isActive = signal(true);
<button [disabled]="!isActive()">Save</button>
Use computed signals for derived values.


typescript
isDisabled = computed(() => this.username().trim() === '');
Use attribute binding when the target is an HTML attribute rather than a DOM property.

<div [attr.aria-label]="description"></div>
Avoid direct DOM manipulation.

Prefer Angular template bindings instead of manually changing DOM properties using JavaScript.

Use meaningful variable names.


typescript
isSubmitDisabled = true;
<button [disabled]="isSubmitDisabled">Submit</button>
Official reference: Angular – Binding dynamic text, properties and attributes .

11. Angular Property Binding Interview Questions and Answers
Here are 15 important interview questions, from beginner to advanced.

Beginner-level questions
Q1. What is Property Binding in Angular?

Property Binding is a one-way data-binding technique that transfers data from a component class to a DOM element, directive, or component property.

Q2. What is the syntax of Property Binding?

<input [value]="username">
Q3. Is Property Binding one-way or two-way data binding?

Property Binding is one-way data binding because data flows from the component to the template target.

Q4. What is the difference between Property Binding and Interpolation?

Property Binding passes the expression value to a target property, whereas Interpolation converts the expression to a string.

Q5. Can we use Property Binding with a boolean value?

Yes.

<button [disabled]="true">Submit</button>
Intermediate-level questions
Q6. Why should we use Property Binding instead of Interpolation for boolean properties?

Because Property Binding preserves the boolean value. Interpolation converts the value into a string, which can cause incorrect behavior with HTML boolean attributes.

Q7. Can we bind an image source using Property Binding?

Yes.

<img [src]="imageUrl" alt="Profile">
Q8. What is the difference between [disabled] and [attr.disabled]?

[disabled] sets the DOM boolean property.

[attr.disabled] controls the HTML attribute.

For [attr.disabled], use null to remove the attribute.

Q9. Can we use Property Binding with custom Angular components?

Yes.

<app-user [user]="currentUser"></app-user>
Here, user must be a matching input on the child component.

Q10. Can Property Binding be used with CSS classes and styles?

Yes.

<div [class.active]="isActive"></div>
<p [style.color]="textColor"></p>
Advanced-level questions
Q11. What happens when the component property changes?

Angular updates the corresponding bound target when the binding is checked. Signals read in templates also notify Angular when their values change.

Q12. Can we bind an object using Property Binding?

Yes.

<app-user [user]="userObject"></app-user>
Property Binding can pass objects without converting them into strings.

Q13. What is the difference between Property Binding and Event Binding?

Property Binding

Event Binding

Uses []

Uses ()

Component to target

Target event to component

Sets a property

Handles an event

Example:

<button [disabled]="isDisabled"
        (click)="saveData()">
  Save
</button>
Q14. How is Property Binding related to Signals in Angular 21?

Signals provide reactive values that can be read in Property Binding.


typescript
isDisabled = signal(true);
<button [disabled]="isDisabled()">
  Submit
</button>
When the signal changes, Angular updates the button.

Q15. What is the difference between Property Binding and
