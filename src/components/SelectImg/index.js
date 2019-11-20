import React,{ useState, useEffect } from 'react';
import { Checkbox } from 'antd';

import './index.css';

const pictures = [
  {
    id: '1',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
  {
    id: '2',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
  {
    id: '3',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
];

function SelectImg(){

  const [value, setValue] = React.useState(['1','2','3']);
  // const [pictures, setPictures] = useState(pictures);
  
  console.log(value); // 输出用户选择图片 id。

  return <PictureSelect pictures={pictures} value={value} onChange={(value) => setValue(value)} />
}

function PictureSelect(props){

  const [ pictures, setPictures] = useState([]);
  const [ selection, setSelection] = useState(0);
  
  useEffect(()=>{
    // console.log('====')
    const picturesArr = deepCopy(props.pictures);
    let selectionNum = 0;
    picturesArr.forEach((v,i) => {
      for(let y = 0; y < props.value.length; y++){
        if(picturesArr[i].id === props.value[y]){
          ++selectionNum;
          picturesArr[i].checked = true;
        }
      }
    });
    setSelection(selectionNum);
    setPictures(picturesArr);
  },[])

  //全选处理函数
  const allChecked = (e)=>{
    let arr = deepCopy(pictures);
    let checked = e.target.checked;
    const idAather = [];   //返回发给父组件的id集合

    arr.forEach((v,i) => {
      arr[i].checked = checked;
      idAather.push(arr[i].id);
    });
    setSelection(checked ? arr.length:0);
    setPictures(arr);
    props.onChange( checked ? idAather : [])
  }

  // 选择处理函数
  const changePicture = (e)=>{
    let { checked, index, id} = e.target;
    let arr = deepCopy(pictures);
    setSelection(checked === true ? selection+1:selection-1);
    arr[index].checked = checked;
    setPictures(arr);
    props.onChange(checked === true ? id:'')
  }

  // 深拷贝函数
  function deepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }
  return(
    <div style={{marginTop:"100px"}}>
      <Checkbox onChange={allChecked}>已选中{selection}个文件</Checkbox>
      <div className="main">
        {
          pictures.map((item,index)=>{
            return(
              <div className="img-container" key={index}>
                <div className="checkbox"><Checkbox checked={item.checked} onChange={changePicture} id={item.id} index={index}/></div>
                <img src={item.url} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SelectImg;