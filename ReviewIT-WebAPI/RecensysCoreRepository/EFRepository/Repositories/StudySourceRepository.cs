using System;
using System.Collections.Generic;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class StudySourceRepository : IStudySourceRepository
    {
        private readonly RecensysContext _context;

        public StudySourceRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public void Post(int studyId, ICollection<StudySourceItemDTO> dtos)
        {
            var entityDictionary = new Dictionary<StudySourceItemDTO.FieldType, Field>();
            foreach (var dataType in _dataTypes)
            {
                // if datastore does not already contains a field
                var fieldEntity = _context.Fields.SingleOrDefault(f => (f.StudyId == studyId) && (f.Name == dataType.Key.ToString()));
                if (fieldEntity == null)
                {
                    fieldEntity = new Field
                    {
                        StudyId = studyId,
                        Name = dataType.Key.ToString(),
                        DataType = dataType.Value
                    };
                }
                entityDictionary.Add(dataType.Key, fieldEntity);
            }

            // Add articles with data related to fields
            foreach (var dto in dtos)
            {
                var allFields = new Dictionary<StudySourceItemDTO.FieldType, Field>(entityDictionary);
                var article = new Article
                {
                    StudyId = studyId,
                    Data = new List<Data>()
                };
                foreach (var fieldDto in dto.Fields)
                {
                    if (allFields.ContainsKey(fieldDto.Key))
                    {
                        var d = new Data
                        {
                            Value = fieldDto.Value,
                            Field = allFields[fieldDto.Key]
                        };
                        article.Data.Add(d);
                        allFields.Remove(fieldDto.Key);
                    }
                }
                // Add remaining data that was not on article in dto
                // TODO alternatively alert the user that a bibtex item was incomplete and require some action
                foreach (var e in allFields)
                {
                    article.Data.Add(new Data {Field = e.Value});
                }
                _context.Articles.Add(article);
            }
            _context.SaveChanges();
        }

        private readonly Dictionary<StudySourceItemDTO.FieldType, DataType> _dataTypes = new Dictionary<StudySourceItemDTO.FieldType, DataType>
        {
            //{StudySourceItemDTO.FieldType.Address, DataType.String },
            //{StudySourceItemDTO.FieldType.Annote, DataType.String },
            {StudySourceItemDTO.FieldType.Author, DataType.String },
            {StudySourceItemDTO.FieldType.Booktitle, DataType.String },
            //{StudySourceItemDTO.FieldType.Chapter, DataType.String },
            //{StudySourceItemDTO.FieldType.Crossref, DataType.String },
            //{StudySourceItemDTO.FieldType.Edition, DataType.String },
            //{StudySourceItemDTO.FieldType.Editor, DataType.String },
            //{StudySourceItemDTO.FieldType.HowPublished, DataType.String },
            //{StudySourceItemDTO.FieldType.Instritution, DataType.String },
            //{StudySourceItemDTO.FieldType.Journal, DataType.String },
            //{StudySourceItemDTO.FieldType.Key, DataType.String },
            //{StudySourceItemDTO.FieldType.Month, DataType.String },
            //{StudySourceItemDTO.FieldType.Note, DataType.String },
            //{StudySourceItemDTO.FieldType.Number, DataType.Number },
            //{StudySourceItemDTO.FieldType.Organization, DataType.String },
            {StudySourceItemDTO.FieldType.Pages, DataType.Number },
            //{StudySourceItemDTO.FieldType.Publisher, DataType.String },
            {StudySourceItemDTO.FieldType.School, DataType.String },
            //{StudySourceItemDTO.FieldType.Series, DataType.String },
            {StudySourceItemDTO.FieldType.Title, DataType.String },
            {StudySourceItemDTO.FieldType.Type, DataType.String },
            //{StudySourceItemDTO.FieldType.Volume, DataType.String },
            {StudySourceItemDTO.FieldType.Year, DataType.Number },
            //{StudySourceItemDTO.FieldType.URL, DataType.String },
            //{StudySourceItemDTO.FieldType.ISBN, DataType.String },
            //{StudySourceItemDTO.FieldType.ISSN, DataType.String },
            //{StudySourceItemDTO.FieldType.LCCN, DataType.String },
            {StudySourceItemDTO.FieldType.Abstract, DataType.String },
            {StudySourceItemDTO.FieldType.Keywords, DataType.String },
            //{StudySourceItemDTO.FieldType.Price, DataType.String },
            //{StudySourceItemDTO.FieldType.Copyright, DataType.String },
            {StudySourceItemDTO.FieldType.Language, DataType.String },
            {StudySourceItemDTO.FieldType.Contents, DataType.String },
            //{StudySourceItemDTO.FieldType.Doi, DataType.String },
            {StudySourceItemDTO.FieldType.ItemType, DataType.String }
        };

        
    }
}