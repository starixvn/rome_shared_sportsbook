namespace Fanex.PTEngine.BusinessObjects
{
    using System;
    using System.Collections;
    using System.Data;
    using System.Reflection;
    using System.Xml.Linq;
    using Fanex.Common.Extensions;
    using Fanex.PTEngine.XmlMapping;

    public class BettingLimitItem : IBettingLimitItem
    {
        public int Id { get; set; }

        public int BetTypeId { get; set; }

        public string Name { get; set; }

        public string Key { get; set; }

        public string ResourceKey { get; set; }

        public decimal? MinBet { get; set; }

        public decimal? MaxBet { get; set; }

        public decimal? MaxPerMatch { get; set; }

        public decimal? MaxPayoutPerMatch { get; set; }

        public decimal? MaxPerBall { get; set; }

        public decimal? MinBetMax { get; set; }

        public decimal? MaxBetMin { get; set; }

        public decimal? MaxPerMatchMin { get; set; }

        public decimal? MaxPerMatchMax { get; set; }

        public decimal? MaxPayoutPerMatchMax { get; set; }

        public decimal? MaxPerBallMax { get; set; }

        public decimal? MaxPerBallMin { get; set; }

        public BettingLimitItem()
        {
        }

        public BettingLimitItem(XElement element, bool is777Group)
            : this()
        {
            Map(element, is777Group);
        }

        public void Map(XElement element, bool is777Group)
        {
            foreach (XAttribute attribute in element.Attributes())
            {
                switch (attribute.Name.LocalName)
                {
                    case Constant.SPORT_TYPE_ID:
                        Id = int.Parse(attribute.Value);
                        break;
                    case Constant.SPORT_TYPE_NAME:
                        Name = attribute.Value;
                        break;
                    case Constant.SPORT_TYPE_KEY:
                        Key = attribute.Value;
                        break;
                    case Constant.SPORT_TYPE_RESOURCE_KEY:
                        ResourceKey = attribute.Value + (is777Group && (attribute.Value.Equals("sabaSoccer") || (attribute.Value.Equals("sabaBasketball"))) ? "_VS" : string.Empty);
                        break;
                    default:
                        break;
                }

                if (string.IsNullOrEmpty(Key) && !string.IsNullOrEmpty(Name))
                {
                    Key = Name;
                }
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="context"></param>
        /// <param name="reader"></param>
        /// <param name="mappingSection"></param>
        public void ReadFromDataReader(IRequestContext context, IDataReader reader, BettingLimitMappingSection mappingSection)
        {
            BettingLimitMappingSection bettingLimitMapping = BettingLimitMappingSection.Instance;
            foreach (BettingLimitElement bettingLimitElement in bettingLimitMapping.BetSettingCollection)
            {
                if (bettingLimitElement.Type == Enum.GetName(typeof(MappingType), MappingType.Out))
                {
                    // If super use config of super, other levels use same config
                    int targetRoleId = 0;
                    if (context.TargetRoleId == Constant.SPECIAL_TARGET_ROLE_ID)
                    {
                        targetRoleId = context.TargetRoleId;
                    }

                    PropertyInfo[] propertyInfos;
                    propertyInfos = typeof(BettingLimitItem).GetProperties();

                    foreach (PropertyInfo propertyInfo in propertyInfos)
                    {
                        if (propertyInfo.Name == bettingLimitElement.MappingTarget)
                        {
                            // Replace pattern
                            string formattedPattern = FormatPattern(bettingLimitElement, this.Id, MappingType.Out);

                            if (reader.HasColumn(formattedPattern))
                            {
                                propertyInfo.SetValue(this, reader.ToDecimal(formattedPattern), null);
                            }
                        }
                    }
                }
            }

            // For Add  New case, set current value = max value
            if (context.FormId == FormType.Add)
            {
                MinBet = MinBetMax;
                MaxBet = MaxBetMin;
                MaxPerMatch = MaxPerMatchMax;
                MaxPayoutPerMatch = MaxPayoutPerMatchMax;
                MaxPerBall = MaxPerBallMax;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="context"></param>
        /// <param name="parameters"></param>
        /// <param name="mappingSection"></param>
        public void MapToSpParameters(IRequestContext context, Hashtable parameters, BettingLimitMappingSection mappingSection)
        {
            BettingLimitMappingSection bettingLimitMapping = BettingLimitMappingSection.Instance;
            foreach (BettingLimitElement bettingLimitElement in bettingLimitMapping.BetSettingCollection)
            {
                if (bettingLimitElement.Type == Enum.GetName(typeof(MappingType), MappingType.In))
                {
                    PropertyInfo[] propertyInfos;
                    propertyInfos = typeof(BettingLimitItem).GetProperties();

                    foreach (PropertyInfo propertyInfo in propertyInfos)
                    {
                        if (propertyInfo.Name == bettingLimitElement.MappingTarget)
                        {
                            // Replace pattern
                            string formattedPattern = FormatPattern(bettingLimitElement, this.Id, MappingType.In);

                            // Add parameters
                            object value = propertyInfo.GetValue(this, null);
                            if (value != null)
                            {
                                parameters.Add(formattedPattern, value);
                            }
                        }
                    }
                }
            }
        }

        private string FormatPattern(BettingLimitElement mappingElement, int sportTypeId, MappingType type)
        {
            string formattedPattern = mappingElement.Pattern;
            if ((this.Id == Constant.SPECIAL_SPORT_TYPE_ID_IS_99 && this.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_MIX_SPROTS_PARLAY)
                || (this.Id == Constant.SPECIAL_SPORT_TYPE_ID_IS_1 && this.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_SOCCER_PARLAY))
            {
                formattedPattern = formattedPattern.Replace(Constant.SPORT_ID_MAP, string.Format(mappingElement.SportId.Format, sportTypeId.ToString() + Constant.SPECIAL_SPORT_TYPE_STRING));
            }
            else if ((this.Id == Constant.SPECIAL_SPORT_TYPE_ID_IS_2 && this.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_SABA_BASKETBALL)
                || (this.Id == Constant.SPECIAL_SPORT_TYPE_ID_IS_1 && this.Key == Constant.SPECIAL_SPORT_TYPE_NAME_IS_SABA_SOCCER))
            {
                formattedPattern = formattedPattern.Replace(Constant.SPORT_ID_MAP, string.Format(mappingElement.SportId.Format, sportTypeId.ToString() + Constant.SPECIAL_SPORT_TYPE_SABA_STRING));
            }
            else
            {
                // Format sport type id
                if (int.Parse(mappingElement.SportId.OmitWhenDefault) == sportTypeId)
                {
                    formattedPattern = formattedPattern.Replace(Constant.SPORT_ID_MAP, string.Empty);
                }
                else
                {
                    formattedPattern = formattedPattern.Replace(Constant.SPORT_ID_MAP, string.Format(mappingElement.SportId.Format, sportTypeId));
                }
            }

            return formattedPattern;
        }
    }
}