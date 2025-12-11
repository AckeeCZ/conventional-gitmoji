# **Conventional gitmoji**

## by Jiří Šmolík, Ackee

Because [Conventional Commits](https://www.conventionalcommits.org/) are boring and there are simply too many [gitmojis](https://gitmoji.dev/) (74).

# Changelog

| Date | Description |
| :---- | :---- |
| 2025-12-02 | v1.1. Updated emojis build (🚀→**👷**) and ci (**👷**→💚) to better match gitmoji.  |
| 2025-10-17 | v1.0. Initial version |

# Specification

1. Follow your standard gitmoji spec for writing commits with the following exception.  
2. Exception is that you only use the following emoji – descriptions taken from [Angular contribution guidelines](https://github.com/angular/angular/blob/e279f301992a65d2378f10076ca79304b3a774de/contributing-docs/commit-message-guidelines.md#type):  
   1. **✨ feat**: A new feature  
   2. **🐛 fix**: A bug fix  
   3. **👷 build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)  
   4. **💚 ci**: Changes to our CI configuration files and scripts (examples: Github Actions, SauceLabs)  
   5. **📝 docs**: Documentation only changes  
   6. **♻️ refactor**: A code change that neither fixes a bug nor adds a feature.  
   7. **⚡️ perf**: A code change that improves performance.  
   8. **✅ test**: Adding missing tests or correcting existing tests.  
   9. ⏪️ **revert**. Reverts a previous commit.

## **How to match other gitmojis?**

The general rule of thumb is this: Use gitmoji that fits the “Why you make the change?” instead of “What are you changing?”.

**Example:** Gitmoji 👔 “Add or update business logic.” – you are adding or updating business rules – Why? To add a new feature? Then it’s a feat ✨. To fix a reported bug in current rules? Then it’s a fix 🐛.

**Example:** “💄 Add or update the UI and style files.” may be ✨ feat when it’s for a new feature, or 🐛 fix when it’s for a bugfix. Can also be ♻️ refactor if it’s style refactoring, or 📝 docs if it’s style for docs.

**Example:** “​​🗃️ Perform database related changes.” may be ✨ feat when it refers to database changes for a new feature, as well as 🐛 fix when it’s to fix a bug, ♻️ refactor for db changes related  to code refactoring, ⚡️perf for improving db performance like adding an index.

**Example:** “🔥 Remove code or files.” may be typically ♻️ refactor when it’s code or code files,  📝 docs,  ✅ test, **👷** build or 💚 ci depending on from which part the files are removed.

**Example:** “🔊 Add or update logs.” may be ✨ feat or 🐛 fix when it regards the code and requirements, or ✅ test, **👷** build or 💚ci when its part of tests/build/CI scripts.

