

export default function ListGroup(props) {
  const {genres, onHandleGenreChange, currentGenre} = props
  return (
   <ul className="list-group">
     <li className={"list-group-item " + (currentGenre === 'reset' && " active")} onClick={()=>{ onHandleGenreChange('reset') }}  >All genres</li>
     {genres.map(({name}) => <li key={name} className={"list-group-item " + (currentGenre === name && " active")} onClick={()=>{ onHandleGenreChange(name) }}  >{name}</li>)}
</ul>
  )
}

