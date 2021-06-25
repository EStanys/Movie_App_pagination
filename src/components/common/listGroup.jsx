

export default function ListGroup(props) {
  const {genres, onHandleGenreChange, currentGenreId, textProperty, valueProperty} = props
  return (
   <ul className="list-group">
     <li className={"list-group-item " + (currentGenreId === 'reset' && " active")} 
     onClick={()=>{ onHandleGenreChange('reset') }}  >All genres
     </li>
     {genres.map(item => 
     <li 
     key={item[valueProperty]} 
     className={"list-group-item " + (currentGenreId === item[valueProperty] && " active")} 
     onClick={()=>{ onHandleGenreChange(item[valueProperty])}}
     >
       {item[textProperty]}
     </li>)}
</ul>
  
  )}

