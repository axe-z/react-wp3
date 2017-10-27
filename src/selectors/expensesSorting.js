///FUNCTION POUR SORTER EXPENSES AVEC LES FILTERS
import moment from 'moment';
moment.locale('fr-ca');

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {

    ////doit retourner true a tout pour afficher,

    const createdAtMoment = moment(expense.createdAt) //en fait un moment obj
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true ;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if(sortBy === 'date'){
      return a.createdAt > b.createdAt ? -1 :  1  //retourner 1 ou - 1
    }
     if(sortBy === 'amount'){
      return a.amount > b.amount ? 1 : -1  //plus gros montant first
    }
  //  return 0 pas de besoin
    });
};


export default getVisibleExpenses


/*
meme chose que :
const arr = [80,100]
const now = 100;
const then = 150;
const test = arr.filter(item => {
  const debut = item ? now <= item : true;
  const fin = item ? then >= item : true;
  return debut && fin
});
 console.log(test)
 */
