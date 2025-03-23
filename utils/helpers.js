function buildUrl(baseUrl, params) {
  let namedParams = ''
  params?.forEach((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      baseUrl += `/${item}`
    } else {
      Object.keys(item).forEach((key, i) => {
        if (item[key] === 'remove') {
          namedParams += `&${key}=`
        } else if (item[key]) namedParams += `&${key}=${item[key]}`
      })
    }
  })
  if (namedParams) {
    // url += `?${trimStart(namedParams, "&")}`;
    baseUrl += `?${namedParams.replace('&', '')}`
  }

  return baseUrl
}

export { buildUrl }
