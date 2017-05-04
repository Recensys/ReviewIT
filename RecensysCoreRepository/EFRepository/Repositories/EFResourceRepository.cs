using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage; // Namespace for CloudStorageAccount
using Microsoft.WindowsAzure.Storage.Blob; // Namespace for Blob storage types
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;

namespace RecensysCoreRepository.Repositories
{
    public class EFResourceRepository: IResourceRepository
    {


        private readonly CloudBlobContainer _blockContainer;
        private readonly RecensysContext _context;

        public EFResourceRepository(CloudBlobContainer blockContainer, RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _blockContainer = blockContainer;
            _context = context;
        }

        
        public DataDTO Update(int dataId, string fileExtension, string contentType, Stream stream)
        {
            var data = _context.Data.Single(d => d.Id == dataId);

            data.Value = (string.IsNullOrEmpty(data.Value) ? Guid.NewGuid().ToString() : data.Value) + fileExtension;
            
            CloudBlockBlob blockBlob = _blockContainer.GetBlockBlobReference(data.Value);

            blockBlob.Properties.ContentType = contentType;

            using (stream)
            {
                Task.WaitAll(blockBlob.UploadFromStreamAsync(stream));
            }

            _context.SaveChanges();
            return new DataDTO
            {
                Id = data.Id,
                Value = data.Value
            };
        }

        public bool Delete(int fieldId)
        {
            throw new System.NotImplementedException();
        }

        public void Dispose()
        {
            
        }
    }
}