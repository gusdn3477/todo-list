import TodoStore from '@/store/TodoStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Card from './Card';

const CardList = observer(() => {
  useEffect(() => {
    TodoStore.fetchCardList();
  }, []);

  const cardList = TodoStore.cardList.map(card => <Card card={card} />);

  return cardList;
});

export default CardList;
