import { nanoid } from "nanoid";
import PropTypes from "prop-types"; 
import css from "./Filter.module.css";

export const Filter = ({value, onChange}) => {
    const filterInputId = nanoid();
    return (
        <div className={css.filter}>
            <label 
            htmlFor={filterInputId}
            className={css.filterLabel}>
            Find contacts by name
            </label>
                <input
                    className={css.filterInput}
                    type="search"
                    name={filterInputId}
                    value={value}
                    onChange={onChange}
                ></input>
        </div>
    )
}

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}