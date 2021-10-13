import {  useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { Button,  Card,  Container,  Divider,  Form,  Grid, GridColumn, GridRow, Input, Table } from "semantic-ui-react";
import { Items } from "./IYoutube";
import { getYoutube } from "./Service";


export function dateFormat(string: any) {
  let options: any = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}




function App() {

  const [embed, setEmbed] = useState("")
  const [status, setStatus] = useState(false)
  const [search, setSearch] = useState("")
  const [videolist, setVideolist] = useState<any[]>([])
  const [lastVideo, setLastVideo] = useState<any[]>([])
  const [favVideo, setFavVideo] = useState<any[]>([])



  useEffect(() => {    
    const arrFav:any = localStorage.getItem("favVideo")
    const arrFavx = JSON.parse(arrFav) || []
    const favSlice = arrFavx.slice(-6)
    setFavVideo(favSlice)   

    const arrLast:any = localStorage.getItem("lastWatchLocal")
    const arrLastX = JSON.parse(arrLast)
    const arrSliced =arrLastX && arrLastX.slice(-6)
    setLastVideo(arrSliced)
       
  }, [])
 
  const history = useHistory()  
   
  function holdLocal(videoLink:any, data:Items) {
    history.push("/videopage/" + videoLink)
    localStorage.setItem("currentVideo",JSON.stringify(data))

    
      const lastVideos:any= []
      lastVideos.push(data)  
      if( localStorage.getItem("lastWatchLocal") === null ){                       
          localStorage.setItem("lastWatchLocal", JSON.stringify(lastVideos))
      }else{
          const lastWatch:any = localStorage.getItem("lastWatchLocal")
          const arrX = (JSON.parse(lastWatch))
          arrX.push(data)
          localStorage.setItem("lastWatchLocal", JSON.stringify(arrX))           
      }  
     
  }


  return (
    < >
     <Container textAlign="center">
      <Grid >
        <GridRow centered={true}>        
          <Form>
      <Input onChange={(e) => setSearch(e.target.value)} placeholder="Arama Yapınız..."></Input>
      <Button onClick={() => {getYoutube(search).then(res =>{   
        console.log(res)  
        setVideolist(res.data.items)
        setEmbed(res.data.items[0].id.videoId)         
        setStatus(true)  
      })}}
      >Ara</Button>
      </Form>
      <hr/>
      </GridRow>      
    </Grid>
    
    { status &&
      videolist.map((item,index) => {
        return ( 
          <Grid columns="1"> 
          <Table.Row key={index} onClick={() => holdLocal(item.id.videoId,item)}>        
            <Table.Cell><img src={item.snippet.thumbnails.default.url} alt=""/></Table.Cell>
            <Table.Cell>{item.snippet.title}</Table.Cell>                    
          </Table.Row>
          </Grid> 
        
        )
      })
   
    }   

    <h2>Favorilerim</h2>  
    <hr/>
    <Grid columns="6">
    <GridRow columns="6">
      
    {  favVideo &&
      favVideo.map((item:any,index:any) => {
        return (
          <GridColumn stretched>
          <Card key = {index} onClick={() => holdLocal(item.id.videoId,item)}> 
          <img src = {item.snippet.thumbnails.default.url} alt =""/>       
          <Card.Content>
            <Card.Header>{item.snippet.title}</Card.Header>
            <Card.Meta>
              <span className='date'>{dateFormat(item.snippet.publishedAt)}</span>
            </Card.Meta>                      
          </Card.Content>
        </Card>  
        </GridColumn>     
        
        )
      })
    }   
    </GridRow>
    </Grid>

    <h2>Son Oynatılanlar</h2>    
    <Divider horizontal/>
      <Grid columns="6">
        <GridRow columns="6">
      {  lastVideo &&
      lastVideo.map((item:any,index:any) => {
        return (
          <GridColumn stretched>
          <Card fluid key = {index} onClick={() => holdLocal(item.id.videoId,item)}> 
          <img src = {item.snippet.thumbnails.default.url} alt =""/>       
          <Card.Content>
            <Card.Header>{item.snippet.title}</Card.Header>
            <Card.Meta>
              <span className='date'>{dateFormat(item.snippet.publishedAt)}</span>
            </Card.Meta>                      
          </Card.Content>
        </Card>  
        </GridColumn>          
        )
        }       
      )
      }   
      </GridRow>
      </Grid>
    </Container>   
      
    </>

  );
}

export default App;
