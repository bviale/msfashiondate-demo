using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MSFashionDateBackend.Models;
using Microsoft.WindowsAzure.Storage.Table;
using MSFashionDateBackend.Models.InternalDTO;

namespace MSFashionDateBackend.Storage
{
    /*
        Azure storage
        "angulardemo",
        "Du5OYLuqqieSAT6x86uE0akSiI09F98tBM2cmeH+BeEPTE2PAPKupVn3RwnNf8+z2QPJBB/hpWYRvyoSJNq2Bw==" 
    */

    public class TableStorageContainer
    {
        const string MARS_PICTURES_TABLE = "marspictures";
        const string STORAGE_DATE_FORMAT = "dd-MM-yyyy";

        private CloudStorageAccount storageAccount;

        public TableStorageContainer(string connectionString)
        {
            storageAccount = CloudStorageAccount.Parse(connectionString);
        }

        public async Task SavePicturesByDate(List<MarsPictureModel> pictures, DateTime date)
        {
            var client = storageAccount.CreateCloudTableClient();
            var table = client.GetTableReference(MARS_PICTURES_TABLE);

            await table.CreateIfNotExistsAsync();

            var partitionKey = date.ToString(STORAGE_DATE_FORMAT);

            pictures.ForEach((p) =>
            {
                p.PartitionKey = partitionKey;
                p.RowKey = p.Id.ToString();
            });

            var batchOperation = new TableBatchOperation();

            foreach (var picture in pictures)
            {
                if (batchOperation.Count == 100)
                {
                    await table.ExecuteBatchAsync(batchOperation);
                    batchOperation.Clear();
                }

                batchOperation.InsertOrReplace(picture);
            }

            await table.ExecuteBatchAsync(batchOperation);
        }

        public async Task<List<MarsPictureItem>> GetMarsPictures()
        {
            var client = storageAccount.CreateCloudTableClient();
            var table = client.GetTableReference(MARS_PICTURES_TABLE);

            await table.CreateIfNotExistsAsync();

            //var query = TableOperation.Retrieve<MarsPictureModel>();
            var query = new TableQuery<MarsPictureItem>();

            var results = await table.ExecuteQuerySegmentedAsync(query, new TableContinuationToken());

            return results.ToList();
        }
    }
}
