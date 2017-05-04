using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliographyParserCore.BibTex;
using RecensysCoreRepository.DTOs;
using Xunit;

namespace BibliographyParserCore.Tests
{
    public class BibTexParserTests
    {

        [Fact(DisplayName = "ToBibtexString")]
        public void Test1()
        {
            var input = new List<ArticleDTO>
            {
                new ArticleDTO {Id = 10, Data = new Dictionary<string, string>
                {
                    { "Author", "M. Pedersen" },
                    { "ItemType", "Book"},
                    { "Pages", "9" }
                }},
                new ArticleDTO {Id = 11, Data = new Dictionary<string, string>
                {
                    { "Author", "M. Pedersen" },
                    { "ItemType", "Book"},
                    { "Pages", "8" }
                }},
            };
            var expected = "@Book{10,\nauthor = {M. Pedersen},\npages = {9}},\n@Book{11,\nauthor = {M. Pedersen},\npages = {8}}";

            var r = input.ToBibtexString();

            Assert.Equal(expected, r);
        }
    }
}
