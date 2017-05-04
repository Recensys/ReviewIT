using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace RecensysCoreWebAPI.Utils
{
    public static class AuthExtensions
    {
        public static bool TryGetSub(this IEnumerable<Claim> claims, out string result)
        {
            const string claimName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
            var nameidentifier = claims.SingleOrDefault(c => c.Type == claimName);
            if (nameidentifier != null && nameidentifier.Value != "")
            {
                result = nameidentifier.Value;
                return true;
            }
            result = $"{claimName} not found among claims";
            return false;
        }
    }
}
