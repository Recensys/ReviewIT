using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// A field checker to verify whether an author field is valid. This can either be a single author, or a list of authors.
    /// First and last name can be separated by a comma. Multiple authors are separated by 'and'.
    /// </summary>
    public class AuthorFieldChecker : IFieldChecker
    {
        readonly Regex _name = new Regex(@"^(?!and\s*$)(?: ?([A-Za-z\.\-']+)(,(?=.))?)+$", RegexOptions.Singleline);
        public bool Validate(string field)
        {
            if (string.IsNullOrWhiteSpace(field)) return false;
            var strings = field.Split(new [] {" and "}, StringSplitOptions.None);
            var state = strings.Aggregate(true, (current, s) => current && _name.IsMatch(s));
            return state;
        }
    }
}
