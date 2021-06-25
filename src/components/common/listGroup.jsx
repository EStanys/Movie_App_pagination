// 1. paduoti reikalinga info i listGroup

// 2. list group pasidaryti saraso jsx

// 3. dinamiskai sugeneruoti tiek el kiek yra genres

// 4. movie table sukurti metoda kuris nustato zanra

// 5. iskviesti ta metoda is listGroup componento

// 6. movieTable sukurti state savybe currentGenre

// 7. pakeisti zanra paspaudus ant saraso el

// 8. rodyti zanra kuris yra nustatytas melynam fone (pan kaip pagination)

// 9. padaryti kad rodytu tik tuos filmus kurie attitinka pasirinkta zanra

// 10. prideti 'All genres' pasirinkima

// 11. prideti select lauka prie puslapiavimo kuriame butu galima pasirinkti
// kiek items per puslapi mes norim rodyti

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect, textProperty, valueProperty } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={'list-group-item ' + (item === selectedItem ? 'active' : '')}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: '_id',
  textProperty: 'name',
};

export default ListGroup;
