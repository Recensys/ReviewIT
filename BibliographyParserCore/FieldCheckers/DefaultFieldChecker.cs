using System.Text.RegularExpressions;

namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// Default <see cref="IFieldChecker"/> implementation. Matches all strings that do not contain newlines.
    /// </summary>
    public class DefaultFieldChecker : IFieldChecker
    {
        readonly Regex _r = new Regex("^.*$");

        public bool Validate(string s)
        {
            return _r.IsMatch(s);
        }
    }
}
