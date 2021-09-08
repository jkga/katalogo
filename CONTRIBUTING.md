# Catalogo Alfabetico de Apellidos Guidelines
This document contains the instructions on adding, deleting, and modifing records on this repository. This also contain the proper way of sending a pull request as well as reporting bugs to the developers.       

## A. Conventions   
- Record must be present on the list of surnames from the online copy of this [book](https://issuu.com/filipinasheritagelibrary/docs/catalogo_alfabetico_de_apellidos/60)   
- No alteration or correction of letter is allowed except on the following
  - Surname must be in **Uppercase**
  - Terminating dot *(.)* in the name must be excluded
- No repeating records
- List of Surnames must be in **Alphabetical** order **[A-Z]**. Please make sure that the newly added item is placed correctly
- Record must only contain a valid **UTF-8** characters

## B. Contribute
- Please always **submit** an issue before working locally. This avoids multiple persons working on the same record.
- No pull request shall be made to the main branch of this repository. Any request to the `main` branch will be automatically rejected. Please always send your `PR` to the `dev` branch   
- Always `pull` first from the `remote` repository before doing any changes. This is to ensure that you have the latest copy of the records
```git
  git pull origin dev
```
- In a scenario of multiple `PRs` has been submitted to alter any record, the **first correct** `PR` will be merged 
- Only **one** action in `PR` is allowed. You **MUST NOT** *add, delete and alter* record at the same time. This will help us to make this repository maintainable
- Refrain from inserting multiple items in between surnames. If possible, please add in squence (first 10, first 5, etc...)   

## C. Issues
- Always search first for possible duplicate issues
- Specify a brief but concise statement for the subject. This will help the maintainers to easily understand what you want to achieve. Please see example below
> Subject: Add new records for Alphabet A   
Description: Add the following records: Ayno, Ayno, and Ayadi
- For alteration request, please specify the file `line number` or attach a screenshot so it could be easily searched and addressed.


## Developer's Note
**Catalogo Alfabetico de Apellidos** is a very long list of old surnames and we cannot add everything overnight. Some of the records are a bit blurred and really hard to read, so the developers might be having trouble in adding those records and minor typos is unavoidable.