import { useSelector } from 'react-redux';

const AttackArrow = () => {
    const { isVisible, attackerPosition, defenderPosition } = useSelector((state) => state.attackArrow);

    if (!isVisible || !attackerPosition || !defenderPosition) {
        return null;
    }

    const { x: x1, y: y1 } = attackerPosition;
    const { x: x2, y: y2 } = defenderPosition;

    return (
        <svg
            className="absolute top-0 left-0 pointer-events-none"
            style={{
                zIndex: 10,
                width: '100%',
                height: '100%',
            }}
        >
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3, 0 6" fill="#ff0048" />
                </marker>
            </defs>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#41e85d"
                strokeWidth="6"
                markerEnd="url(#arrowhead)"
            />
        </svg>
    );
};

export default AttackArrow;
