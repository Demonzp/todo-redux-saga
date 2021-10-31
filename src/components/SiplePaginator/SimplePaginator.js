import { Fragment, useEffect, useState } from 'react';

const SimplePaginator = ({pages, onPage=()=>{}, forcePage})=>{
  const [page, setPage] = useState(1);
  const [isOnPage, setIsOnPage] = useState(false);

  useEffect(()=>{
    if(isOnPage){
      onPage(page);
      setIsOnPage(false);
    }
  }, [page, isOnPage]);

  useEffect(()=>{
    if(Number.isInteger(forcePage) && forcePage!==page){
      setPage(forcePage);
    }
  }, [forcePage]);

  const handlePrev = ()=>{
    let isOn = true;
    setPage(prev=>{
      if(prev-1<1){
        isOn = false;
        return prev;
      }else{
        return prev-1;
      }
    });
    setIsOnPage(isOn);
  };

  const handleNext = ()=>{
    let isOn = true;
    setPage(prev=>{
      if(prev+1>pages){
        isOn = false;
        return prev;
      }else{
        return prev+1;
      }
    });
    setIsOnPage(isOn);
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