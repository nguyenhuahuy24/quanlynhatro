const auth = {
    isAuthenticated() {
      if (typeof window == "undefined")
        return false
  
      if (localStorage.getItem('auth-token'))
        return true
      else
        return false
    }
}
export default auth