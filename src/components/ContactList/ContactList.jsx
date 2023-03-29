import PropTypes from "prop-types"; 
import css from "./ContactList.module.css";

export const ContactList = ({contacts, deleteContact}) => {
    return (
        <div>
            <ul className={css.contactList}>
                {contacts.map(( {id, name, number }) =>
                <li className={css.itemList}
                key={id}>
                    <p className={css.itemName}>{name}</p>
                    <p className={css.itemNumber}>{number}</p>
                    <button
                    className={css.btnDelete}
                    type="button"
                    name="Delete"
                    onClick={() => deleteContact(id)}>Delete contact
                    </button>
                </li>
                )}
            </ul>
        </div>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    deleteContact: PropTypes.func,
}