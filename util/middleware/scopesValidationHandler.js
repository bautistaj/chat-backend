const boom = require('@hapi/boom');

function scopesValidationHandler(allowScopes){
  return function(req, res, next) {
    console.log(req.user.scopes);
    
    if(!req.user || !(req.user && req.user.scopes )) {
      next(boom.unauthorized('Missing scopes'));
    }

    const hasAccessScopes = allowScopes
    .map(allowScope => req.user.scopes.includes(allowScope))
    .find(allowed => Boolean(allowed));

    if(hasAccessScopes){
      next();
    }else{
      next(boom.unauthorized('Insufficient scopes'));
    }
  }
}

module.exports = scopesValidationHandler;