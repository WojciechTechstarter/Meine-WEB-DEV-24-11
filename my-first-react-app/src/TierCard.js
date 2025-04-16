function TierCard(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Species: {props.art}</p>
            <p>Illness: {props.krankheit}</p>
        </div>
    );
}

export default TierCard;
