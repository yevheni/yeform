# yeform

Form validation library

## Typescript

```ts
import {YForm} from "yform";

const fields = [
    {
        key: "first_name",
        value: "Yevhenii",
        required: true,
        isValid() {
            return this.value.length > 2 && this.value.length <= 64;
        }
    },
    {
        key: "last_name",
        value: "",
        required: true,
        isValid() {
            return this.value.length > 0;
        }
    },
    {
        key: "age",
        value: "",
        required: false,
        isValid() {
            return parseInt(this.value.trim()) > 0;
        }
    },
];
const form = new YForm(fields);

/** Check if form valid */
console.log(form.is_valid); // false - "last_name" not valid

/** Return form fields as object */
console.log(form.object); // { first_name: { key: "first_name", value: "Yevhenii", required... }, last_name: ... } 

/** Return form result as object */
console.log(form.result); // { first_name: "Yevhenii", last_name: "", age: "" } }
```
