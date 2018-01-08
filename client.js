const ClientOAuth2 = require('client-oauth2');
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal');

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

new ClientOAuth2({
  clientId: '6e1cf7b4-b107-42b3-9435-8fda70726c6a',
  clientSecret: '6y4FUuP9BfAXeVqguNKT0ofToIwN5RdB1PaUvx_nCMiQbH9NeGq3pp0jQB9zOQ0APOxEbodzJXp-8RVux6318A',
  accessTokenUri: 'https://namidp01.rogfk.no/nidp/oauth/nam/token',
  scopes: ['fint-client']
}).owner.getToken('pwfatut', 'pwfatut').then((user) => {
  traverson
    .from('https://beta.felleskomponent.no/administrasjon/personal/person')
    .withRequestOptions({
      headers: { 'Authorization': `Bearer ${user.accessToken}` }
    })
    .jsonHal()
    .getResource((error, resource) => {
      const navn = resource._embedded._entries[0].navn;
      console.log(`Person: ${navn.fornavn} ${navn.etternavn}`);
      console.log(`Self link: ${resource._links.self[0].href}`);
    });
});

