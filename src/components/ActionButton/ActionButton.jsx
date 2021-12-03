import './ActionButton.scss';

export const ActionButton = ({ word="", icon="", onClick=f=>f, className="" }) => {
    return (
        <div className={"act-btn waves-effect " + className} onClick={onClick}>
            <span>{word}</span>
            <i className="material-icons">{icon}</i>
        </div>
    )
}
