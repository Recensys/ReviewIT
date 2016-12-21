using System.Linq;
using System.Text.RegularExpressions;

namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// A field checker to verify whether an ISBN field is valid.
    /// ISBN, International Standard Book Number is a unique idenfier for books.
    /// More info can be found at: https://en.wikipedia.org/wiki/International_Standard_Book_Number
    /// </summary>
    public class IsbnFieldChecker : IFieldChecker
    {
        readonly Regex _isbn = new Regex(@"^[\d-xX]{13}$");
        readonly Regex _isbnNumbersOnly = new Regex(@"^[\dxX]{10}$");
        public bool Validate(string field)
        {
            if (_isbn.IsMatch(field)) return IsbnCheck(field.Replace("-", ""));
            if (_isbnNumbersOnly.IsMatch(field)) return IsbnCheck(field);
            return false;
        }

        static bool IsbnCheck(string isbn)
        {
            if (isbn.Length != 10) return false;
            var checksum = isbn.Select((t, i) => (10 - i) * GetDigit(t)).Sum();
            return checksum % 11 == 0;
        }

        static int GetDigit(char c)
        {
            return c == 'x' || c == 'X' ? 10 : int.Parse(c.ToString());
        }
    }
}
