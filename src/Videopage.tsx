import { useEffect, useState } from "react"
import { Button, Card, Container, Grid, GridColumn, GridRow } from "semantic-ui-react"
import { dateFormat } from "./App"
import { Items } from "./IYoutube"


export default function Videopage(props:any) {      
    const [favVideos, setFavVideos] = useState([])    
    const [detay, setDetay] = useState<Items>()  


    useEffect(() => {
        const fetchData = async () => { 
        const detaylar:any = localStorage.getItem("currentVideo")
        const detays = JSON.parse(detaylar)
        setDetay(detays)     
       
    };
    fetchData();
               
    }, [])

    useEffect(() => {
        const fetchData = async () => {         
        const favori:any = localStorage.getItem("favVideo")
        const arrxx = (JSON.parse(favori || []))
        setFavVideos(arrxx)    
       
    };
    fetchData();
               
    }, [])

    console.log("detay",detay)
    const isLikeds = detay && favVideos.find((x: any) => x.id.videoId === detay?.id.videoId);
    console.log(`isLikeds`, isLikeds)


    function fncFav(data:any) {  
        let newArr: any = [];
        if (!isLikeds) {
          newArr = [...favVideos, detay]; // arrayde yok ise [...mevcutArray, yeniEleman] seklinde arraye ekletiyoruz...
        } else {
          newArr = favVideos.filter((x: any) => x.id.videoId !== detay?.id.videoId); // filter ile olan veri haric digerlerini yalniz birakitrioyuiruz.
        }
        localStorage.setItem("favVideo", JSON.stringify(newArr));
        setFavVideos(newArr);
      }         
        
      

    return (
        <>   
            <Container>             
                   <Grid columns="2"> 
                    <GridRow>
                        <GridColumn>
                        <iframe allowFullScreen width="560"
                            height="315"
                            src={"https://www.youtube.com/embed/" + detay?.id.videoId}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" >
                        </iframe>
                        <Button active= { isLikeds }
                        content = {isLikeds  ? "Liked"  : "Like"}
                        color = {isLikeds ?  "red"  : "grey"}
                         onClick={() => fncFav(detay)}
                         icon = "heart" />
                        
                        </GridColumn>                      
                        <GridColumn>
                          <Card >
                            <Card.Content header= {detay?.snippet.title} />
                            <Card.Content description={detay?.snippet.description} />
                            <Card.Content description={dateFormat(detay?.snippet.publishedAt)} />
                            <Card.Content description={detay?.snippet.channelTitle} />
                            <Card.Content extra>                           
                            </Card.Content>
                        </Card>
                        </GridColumn>                     
                                                
                    </GridRow>
                    
                </Grid>
            </Container>  
        </>
    )
}
