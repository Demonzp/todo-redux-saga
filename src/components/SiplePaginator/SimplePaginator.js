import { Fragment, useEffect, useState } from 'react';

const SimplePaginator = ({pages, onPage=()=>{}, forcePage})=>{
  const [page, setPage] = useState(1);

  useEffect(()=>{
    onPage(page);
  }, [page]);

  useEffect(()=>{
    if(Number.isInteger(forcePage)){
      setPage(forcePage);
    }
  }, [forcePage]);

  const handlePrev = ()=>{
    setPage(prev=>{
      if(prev-1<1){
        return prev;
      }else{
        return prev-1;
      }
    });
  };

  const handleNext = ()=>{
    setPage(prev=>{
      if(prev+1>pages){
        return prev;
      }else{
        return prev+1;
      }
    });
  }

  return(
    <Fragment>
      {
        pages<=0?
          null
        :
        <div style={{display:"flex"}}>
          <button onClick={handlePrev}>Prev</button>
          <div style={{margin:"0px 5px 0px 5px"}}>{` ${page} / ${pages} `}</div>
          <button onClick={handleNext}>Next</button>
        </div>
      }
    </Fragment>
    
  );
};

export default SimplePaginator;