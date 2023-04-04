namespace Fanex.PTEngine.BusinessObjects
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Xml.Linq;
    using Fanex.PTEngine.XmlMapping;

    public class BettingLimit : IBettingLimit<BettingLimitItem>
    {
        public BettingLimit()
        {
            BettingLimitItems = new List<BettingLimitItem>();
        }

        public IList<BettingLimitItem> BettingLimitItems { get; set; }

        protected BettingLimitMappingSection MappingSection
        {
            get
            {
                return (BettingLimitMappingSection)System.Configuration.ConfigurationManager.GetSection("BettingLimitMappingSection");
            }
        }

        /// <summary>
        /// Caching configuration file, implemented by internal constructor + safe singleton + lazy load pattern
        /// </summary>
        internal static class _Configuration
        {
            static _Configuration()
            {
                try
                {
                    Document = XDocument.Load(HttpContext.Current.Server.MapPath(Constant.BETTING_LIMIT_CONFIG));
                }
                catch (Exception ex)
                {
                    throw new Exception("Could not load BettingLimit configruation file.", ex);
                }
            }

            internal static XDocument Document
            {
                get;
                set;
            }
        }

        public void Populate()
        {
            XDocument document = _Configuration.Document;

            XElement root = document.Root.Element(Constant.ROOT_ELEMENT_BETTING_LIMIT);
            foreach (XElement bettingLimitElement in root.Elements())
            {
                BettingLimitItem item = new BettingLimitItem(bettingLimitElement);

                BettingLimitItem currentItem = (from bt in this.BettingLimitItems
                                                where bt.Id == item.Id && bt.Key == item.Key
                                                select bt).FirstOrDefault();

                if (currentItem == null)
                {
                    currentItem = item;
                    this.BettingLimitItems.Add(item);
                }
            }
        }

        /// <summary>
        /// Set data reader to object BettingLimit
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        public void ReadFromDataRecord(IRequestContext context, System.Data.IDataReader reader)
        {
            this.Populate();

            foreach (BettingLimitItem bettingLimitItem in BettingLimitItems)
            {
                bettingLimitItem.ReadFromDataReader(context, reader, this.MappingSection);
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="parameters"></param>
        public void MapToSpParameters(IRequestContext context, Hashtable parameters)
        {
            this.Populate();

            foreach (BettingLimitItem bettingLimitItem in BettingLimitItems)
            {
                bettingLimitItem.MapToSpParameters(context, parameters, this.MappingSection);
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="parameters"></param>
        public void MapToSpUpdateMultipleParameters(ref Hashtable parameters, Hashtable updateParameters)
        {
            this.Populate();

            int i = Constant.BET_TYPE_INDEX_UPDATE_PARAMETER;
            BettingLimitMappingSection bettingLimitMapping = BettingLimitMappingSection.Instance;
            this.Populate();

            try
            {
                int omitWhenDefault = int.Parse(bettingLimitMapping.BetSettingCollection[0].SportId.OmitWhenDefault);
                string pattern = bettingLimitMapping.BetSettingCollection[0].SportId.Format;
                foreach (BettingLimitItem bettingLimitItem in BettingLimitItems)
                {
                    string formattedPattern = string.Format(pattern, bettingLimitItem.Id);
                    if (bettingLimitItem.Id == omitWhenDefault)
                    {
                        formattedPattern = string.Empty;
                    }

                    if ((bettingLimitItem.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_MIX_SPROTS_PARLAY)
                        || (bettingLimitItem.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_SOCCER_PARLAY))
                    {
                        formattedPattern += Constant.SPECIAL_SPORT_TYPE_STRING;
                    }

                    if ((bettingLimitItem.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_SABA_BASKETBALL)
                        || (bettingLimitItem.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_SABA_SOCCER))
                    {
                        formattedPattern += Constant.SPECIAL_SPORT_TYPE_SABA_STRING;
                    }

                    parameters.Add(Constant.BET_TYPE_UPDATE + formattedPattern, Convert.ToInt16(updateParameters[i]));

                    i++;
                }
            }
            catch (Exception ex)
            {
                throw new System.ArgumentException("Mapping configuration format is invalid.", ex);
            }
        }
    }
}