import { Outgoing } from "../Outgoing/Outgoing"
import "./OutgoingList.scss"

export const OutgoingList = ({ outgoing, category }) => {
     
    return (
        <div className="prod_list">
            {outgoing.map((outInfo, i) => (
                <Outgoing key={i} outId={i} outInfo={outInfo} category={category} />
            ))}
        </div>
    )
}
