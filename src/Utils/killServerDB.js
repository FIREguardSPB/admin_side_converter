

export const killServerDB = async () => {
 fetch('/api/killserver', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}