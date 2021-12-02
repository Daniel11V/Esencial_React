import { Operation } from "../Operation/Operation"
import "./OperationList.scss"

export const OperationList = ({ operations }) => {
     
    return (
        <div className="oper_list">
            {operations.map((operInfo, i) => (
                <Operation key={i} operId={i} operInfo={operInfo} />
            ))}
        </div>
    )
}
