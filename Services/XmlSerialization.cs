using RedhawkApps.Model.InboundXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;

namespace RedhawkApps.Web.Services
{
    public class XmlSerialization
    {

        public IEnumerable<Element> GetAllUniqueElements(string xmlFile)
        {
            XmlDocument doc = new XmlDocument();
            var xml =
                    XElement.Parse(xmlFile);

            var allElementNames =
                         (from e in xml.Descendants()
                          select e.Name.LocalName).Distinct();

            IEnumerable<Element> el = xml.Descendants().Select(a => new
            {
                Name = a.Name.LocalName.ToString(),
                hasText = a.HasElements == true ? false : true

            }).Distinct().Select(b => new Element
            {
                Name = b.Name,
                hasText = b.hasText
            });

            return el;
        }

        public List<string> GetAllChangedElements(string xmlFile, string archXmlFile)
        {
            bool hasChanged = false;
            List<string> listXml = new List<string>();
            if (xmlFile == "" || archXmlFile == "")
            {
                return listXml;
            }
            else
            {
                try
                {

                    XDocument doc1 = XDocument.Parse(xmlFile);
                    XDocument doc2 = XDocument.Parse(archXmlFile);

                    var xml = XElement.Parse(xmlFile);
                    var xml2 = XElement.Parse(archXmlFile);

                    var changedXml = xml.DescendantsAndSelf();
                    var changedXml2 = xml2.DescendantsAndSelf();
                    var allElementNames =
                                  (from e in xml.DescendantsAndSelf()
                                   select e);
                    var allElementNames2 =
                             (from e in xml2.DescendantsAndSelf()
                              select e);

                    for (int i = 0; i < allElementNames.Count(); i++)
                    {
                        if (allElementNames.ElementAt(i).Value != allElementNames2.ElementAt(i).Value
                            && allElementNames.ElementAt(i).HasElements == false && allElementNames2.ElementAt(i).HasElements == false)
                        {
                            hasChanged = true;
                            changedXml.ElementAt(i).SetAttributeValue("hasChanged", true);
                            changedXml2.ElementAt(i).SetAttributeValue("hasChanged", true);
                        }
                    }
                    if (hasChanged)
                    {
                        listXml.Add(changedXml.FirstOrDefault().ToString(SaveOptions.DisableFormatting));
                        listXml.Add(changedXml2.FirstOrDefault().ToString(SaveOptions.DisableFormatting));
                    }
                    else
                    {
                        listXml = new List<string>();
                    }


                }
                catch (Exception ex)
                {
                    throw ex;
                }


            }
            return listXml;
        }

        public bool CompareXmlChanges(string xmlFile, string changedXmlFile)
        {

            if (xmlFile == "" || changedXmlFile == "")
            {
                return false;
            }
            else
            {
                try
                {
                    XDocument doc1 = XDocument.Parse(xmlFile);
                    XDocument doc2 = XDocument.Parse(changedXmlFile);

                    var xml = XElement.Parse(xmlFile);
                    var xml2 = XElement.Parse(changedXmlFile);

                    var changedXml = xml.DescendantsAndSelf();
                    var changedXml2 = xml2.DescendantsAndSelf();
                    var allElementNames =
                                  (from e in xml.DescendantsAndSelf()
                                   select e);
                    var allElementNames2 =
                             (from e in xml2.DescendantsAndSelf()
                              select e);

                    for (int i = 0; i < allElementNames.Count(); i++)
                    {
                        if (allElementNames.ElementAt(i).Value != allElementNames2.ElementAt(i).Value
                            && allElementNames.ElementAt(i).HasElements == false && allElementNames2.ElementAt(i).HasElements == false)
                        {
                            return true;

                        }
                    }
                    return false;
                }
                catch (Exception ex)
                {
                    throw ex;
                }


            }
        }


        public List<string> XmlValidation(string xml, string xsdPath)
        {
            List<string> validationError = new List<string>();
            try
            {
                XmlSchemaSet schema = new XmlSchemaSet();
                schema.Add(null, xsdPath);
                XmlReaderSettings xmlReadeSettings = new XmlReaderSettings();
                xmlReadeSettings.ValidationType = ValidationType.Schema;
                xmlReadeSettings.Schemas.Add("redhawk", xsdPath);
                xmlReadeSettings.ValidationEventHandler += delegate (object sender, ValidationEventArgs args)
                {
                    validationError.Add(args.Message);

                };

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml);
                doc.DocumentElement.SetAttribute("xmlns", "redhawk");

                StringReader sReader = new StringReader(doc.OuterXml);
                XmlReader xmlReader = XmlReader.Create(sReader, xmlReadeSettings);

                while (xmlReader.Read()) { }
                xmlReader.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return validationError;

        }


    }
}