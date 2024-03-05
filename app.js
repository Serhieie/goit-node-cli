const contactsDb = require("./contacts/index");
const { program } = require("commander");

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "get":
      const getAll = await contactsDb.getAllContacts();
      return console.log(getAll);
    case "getById":
      const getContact = await contactsDb.getContactById(id);
      return console.log(getContact);
    case "add":
      const newContact = await contactsDb.addContact({ name, email, phone });
      return console.log(newContact);
    case "update":
      const updatedContact = await contactsDb.updateContact(id, { name, email, phone });
      return console.log(updatedContact);
    case "delete":
      const bookForDelete = await contactsDb.deleteContact(id);
      return bookForDelete;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
