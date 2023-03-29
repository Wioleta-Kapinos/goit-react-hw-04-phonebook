import { nanoid } from "nanoid";
import PropTypes from "prop-types"; 
import css from "./ContactForm.module.css";

export const ContactForm = ({handleSubmit}) => {
    const nameInputId = nanoid();
    const numberInputId = nanoid();
    return (
        <div className={css.contactForm}>
            <form onSubmit={handleSubmit} className={css.form}>
                <label 
                    htmlFor={nameInputId}
                    className={css.label}>
                    Name
                </label>
                <input 
                    id={nameInputId}
                    className={css.input}
                    name="name"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                ></input>
                <label 
                    htmlFor={numberInputId}
                    className={css.label}>
                    Number
                </label>
                <input
                    id={numberInputId}
                    className={css.input}
                    type="tel"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    name="number"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                ></input>
                <button 
                    type="submit"
                    className={css.addContact}>Add contact</button>
            </form>
        </div>
    )
}

ContactForm.propTypes = {
    handleSubmit: PropTypes.func,
}