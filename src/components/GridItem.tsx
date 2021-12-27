import './GridItem.scss'

interface Props{
    url: string,
    description: string
}

export default function GridItem({url, description}: Props) {
    return (
        <div className="grid-item">
            <img src={url} className="grid-item-media" />
            <p>{description}</p>
        </div>
    )
}
