# greensms-node

[![NPM](https://nodei.co/npm/greensms.png?downloads=true&stars=true)](https://nodei.co/npm/greensms/)

![GitHub release (latest by date)](https://img.shields.io/github/v/release/greensms-ru/greensms-node)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/greensms-ru/greensms-nod/unit-test)
![Coveralls github](https://img.shields.io/coveralls/github/greensms-ru/greensms-node)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/bda5e78fb51a4c24b2935d93369df539)](https://www.codacy.com/gh/greensms-ru/greensms-node/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=greensms-ru/greensms-node&amp;utm_campaign=Badge_Grade)

## Documentation

The documentation for the GREENSMS API can be found [here][apidocs].

### Supported Node.js Versions

This library supports the following Node.js implementations:

* Node.js 8
* Node.js 10
* Node.js 12
* Node.js 14

TypeScript is supported for TypeScript version 2.9 and above.

## Installation
```bash
npm install greensms --save
```

## Sample Usage

Check out these [code examples](examples) in JavaScript and TypeScript to get up and running quickly.

```javascript
var username = process.env.GREENSMS_USERNAME; // Your Account Login from my.greensms.ru
var password = process.env.GREENSMS_PASSWORD;   // Your Account Password from my.greensms.ru

const greensms = require('greensms')(username, password);
greensms.sms.send({
    to: '79262345678',
    txt: 'Message to deliver',
  })
  .then((response) => {
    console.log("Request ID: %", response.request_id);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Environment Variables

`greensms-node` supports credential storage in environment variables. If no credentials are provided when instantiating the GreenSMS client (e.g., `const client = require('greensms')();`), the values in following env vars will be used: `GREENSMS_USERNAME`/`GREENSMS_PASSWORD` OR `GREENSMS_TOKEN`.

### Token Auth

## Methods

## Handling Exceptions

For an example on how to handle exceptions in this helper library.

## Getting help

If you need help installing or using the library, please contact us: [support@greensms.ru](mailto:support@greensms.ru).

If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!

## Contributing

Bug fixes, docs, and library improvements are always welcome. Please refer to our [Contributing Guide](CONTRIBUTING.md) for detailed information on how you can contribute.
If you're not familiar with the GitHub pull request/contribution process, [this is a nice tutorial](https://gun.io/blog/how-to-github-fork-branch-and-pull-request/).

#### Getting Started

If you want to familiarize yourself with the project, you can start by [forking the repository](https://help.github.com/articles/fork-a-repo/) and [cloning it in your local development environment](https://help.github.com/articles/cloning-a-repository/). The project requires [Node.js](https://nodejs.org) to be installed on your machine.

After cloning the repository, install the dependencies by running the following command in the directory of your cloned repository:

```bash
npm install
```

You can run the existing tests to see if everything is okay by executing:

```bash
npm test
```

[apidocs]: https://api.greensms.ru/
