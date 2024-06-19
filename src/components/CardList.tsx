import CardStore from '@/store/CardStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Card from './Card';

const CardList = observer(() => {
  useEffect(() => {
    CardStore.fetchCardList();
  }, []);

  const cardList = CardStore.cardList.map(card => (
    <Card
      id={card.id}
      key={card.id}
      checked={card.checked}
      title={card.title}
      date={card.date}
      isBookMarked={card.isBookMakred}
      tagColor={card.tagColor}
    />
  ));

  return cardList;
});

export default CardList;
