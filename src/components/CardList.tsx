import CardStore from '@/store/CardStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Card from './Card';

const CardList = observer(() => {
  useEffect(() => {
    CardStore.fetchCardList();
  }, []);

  const cardList = CardStore.cardList.map(card => <Card card={card} />);

  return cardList;
});

export default CardList;
