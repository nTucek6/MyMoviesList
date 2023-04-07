
export default  function RefreshToken({token})
{
    localStorage.clear();
    localStorage.setItem('token',JSON.stringify(token));
}