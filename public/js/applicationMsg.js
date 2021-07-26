function message()
{
    document.getElementById('msg').innerHTML="succes";
}
var a=0;
function nav()
{
    if(a%2==0)
    {
        a++;
     document.getElementById('list').style.color='white';
    document.getElementById('dim').style.display='block';
    document.getElementById('options').style.display='block';
    }
    else
    {
        a--;
        document.getElementById('options').style.display='none';
        document.getElementById('list').style.color='black';
        document.getElementById('dim').style.display='none'; 
          
    }
}