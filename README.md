# eslint-plugin-test-eslint-rule

test

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-test-eslint-rule`:

```sh
npm install eslint-plugin-test-eslint-rule --save-dev
```

## Usage

Add `test-eslint-rule` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "test-eslint-rule"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "test-eslint-rule/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


