export default (context) => {
  return new Promise(function (resolve) {
    resolve({
      app: {
        title: `Almetrek Holding Group`,
        description: 'A closed joint stock company that owns multiple companies in contracting, food, medical services, environmental services, technical services, logistical, petroleum, and industrial services',
        dir: `ltr`,
        ar: `عربي`,
        en: `English`,
      },

      input: {
        gender: `Nickname`,
        mr: `the master`,
        ms: `women (ms)`,
        name: `name`,
        mobile: `mobile`,
        message: 'message',
        email: `E-mail`,
        country: `state`,
        city: `city`,
        code: `Code`,
        desc: `brief description`,
        service: `Required service`,
        register: `send`,
        done: 'Registered, our team will contact you shortly.'
      },

      nav: {
        link_1: 'HOME',
        link_2: 'About Us',
        link_3: 'Partners',
        link_4: 'our projects',
        link_5: 'Team',
        link_6: 'Success Partners',
        link_7: 'Trademarks',
        link_8: 'Group Profile',
        call_to_action: 'CONTACT US'
      },

      intro: {
        title: 'We are committed to keep our promises',
        desc: 'We are committed to loyalty and transparency in all our dealings with our partners'
      },

      about: {
        title: 'About Almetrek Holding',
        slogan: 'We are all leaders within our sphere of responsibility and are deeply committed to delivering pioneering results',
        desc: 'A closed joint stock company that owns multiple companies in contracting, food, medical services, environmental services, technical services, logistics, petroleum, and industrial services',
        title_1: 'Vision',
        title_2: 'Values',
        title_3: 'Mission',
        desc_1: 'To be in the ranks of major national groups with all its partners in the Kingdom of Saudi Arabia by Vision 2030 and to provide the finest comprehensive services through an integrated and harmonious system that meets the needs and requirements of the Saudi and Gulf market in general.',
        desc_2: 'Commitment to responsibility in working with all the agreements that we conclude. Our strategies are based on ensuring a high level of quality and professionalism, as well as understanding the client s basic needs and meeting them to a level that exceeds expectations. We are also constantly working on developing our capabilities to ensure the efficiency of our human resources.',
        desc_3: 'Our main principle in Almetrek Holding Group is to meet the satisfaction of our partners; Through the continuous development of investment. In terms of performance; We are committed to carrying out our work with the highest quality, adherence to the highest standards of credibility and transparency, and providing the best achieved results.',
      },

      companies: {
        title: 'Group Companies',
        desc: 'Diversified companies advance our country and enhance our path towards a prosperous diversified economy.',
        name_1: 'Almetrek Construction & Pledges Company',
        name_2: 'Almetrek Environmental Services Company',
        name_3: 'Almetrek Food Supplies Company',
        name_4: 'Almetrek Petroleum Services Company',
        name_5: 'Almetrek Logistics Services Company',
        name_6: 'Primary Care Medical Services Company',
        name_7: 'Auto Brand Car Company',
        name_8: 'Al-Madinah Pharmaceutical Factory Company For Industry ',
        name_9: 'Ghras Unyied Company',
        desc_1: 'Classified as first-class in operation, maintenance, infrastructure, buildings and roads, and we are working to be the strongest link with government institutions and their subsidiaries.',
        desc_2: 'Classified first-class in the sector of pest control, epidemics, operation and maintenance, as well as city cleanliness and the care of parks and gardens.',
        desc_3: 'Classified in the provision of catering to government institutions, and we have a brand Cedar Market for retail food stuff.',
        desc_4: 'We are among 30 qualified companies in the Kingdom to operate gas stations and we own the Petrometric brand.',
        desc_5: 'We have more than 300 transport trucks specialized in land and water transport, and our fleet will be 600 trucks in 2023 AD.',
        desc_6: 'In Primary Care Company, we always and forever care about the highest health care services in maintaining the quality of service and the level of efficiency.',
        desc_7: 'One of the group companies, we work in selling and renting cars in the private and public sectors, and we were launched at the beginning of 2021.',
        desc_8: 'Classified of the first class in providing catering to government institutions and we have a brand "Sedr Market" for retail food stuff.',
        desc_9: 'Classified third-class in the field of communications and information technology, and we own the brand (GEOTEC) specialized in electronic works of communications and the brand (Quick Fix) specialized in cleaning and electromechanical works.',
      },

      projects: {
        title: 'Projects',
        desc: 'Various projects between the public and private sectors, through which we have proven merit and entitlement.',
        name_1: 'Cleanliness of the building of the Ministry of Interior and its attached buildings in Riyadh',
        name_2: 'Contract Agreement for Dewatering Services in Riyadh (My Environment)',
        name_3: 'Agreement for the delivery of water and sewage services through the implementation of household connections in Al-Baha',
        name_4: 'Agreement for the delivery of water and sanitation services through the implementation of household connections in Tabuk',
        name_5: 'Connecting water from the treatment plant to Hail Wild Park - Phase One',
        name_6: 'A project to replace water networks in the town of Al-Awamiya in the Qatif Governorate',
        name_7: 'Completion of water fountains, a reservoir in the farms, and a reservoir in the villages of Al-Baha',
        name_8: 'Construction of Al-Hayel Village Road in Tabuk Region',
        name_9: 'Operation, maintenance and cultivation of the agricultural research station of King Abdulaziz University in Hada Al-Sham and the educational nursery on the university campus',
        name_10: 'Operation and Maintenance of the Research Station at King Faisal University in Al-Ahsa',
        name_11: 'Maintenance, cleanliness and operation of the branches of the General Presidency for Scholarly Research and Ifta',
        name_12: 'Operation and maintenance of the honey bee industry development center in Wadi Namar, Ministry of Environment, Water and Agriculture',
        name_13: 'Operation and maintenance of heavy equipment in the Municipality of Jeddah and insuring them within the scope of the northern municipalities',
        name_14: 'Operation and maintenance of heavy equipment in the Municipality of Jeddah and insuring them within the scope of the municipalities of the South',
        name_15: 'Operation and maintenance of heavy equipment in the Municipality of Jeddah and insuring them within the scope of the central municipalities',
        name_16: 'Providing veterinary services to electronically number and register camels',
        name_17: ': Maintenance and cleanliness of the control units in the Border Guard Directorate',
        name_18: 'Pest Control Project at Security Forces Hospital',
        name_19: ': Disposal of rainwater and torrential rains collected in the guard buildings in various locations of the National Guard in Riyadh',
        name_20: 'Maintenance, operation and cleaning of seed and seed center nurseries at the Ministry of Environment, Water and Agriculture',
        name_21: 'Transfer of live means to a number of customs sites (land, air and sea)',
        name_22: 'control and fertilization of trees in gardens, parks and roads in Taif and its suburbs',
        name_23: 'Operation and maintenance of irrigation networks at King Saud University',
        name_24: 'Operation, maintenance and cleaning of the King Abdulaziz Center for Purebred Horses and the Al Thumama Horse Pasture',
        name_25: 'Environmental Sanitation to Reduce Occupation in Taif Governorate and its Affiliated Villages',
        name_26: 'Household control of mosquitoes carrying dengue fever in the city of Taif and its affiliated villages',
        name_27: 'Maintenance, operation and cleaning of the buildings of the National Guard regiments in Dirab for a period of three years',
        name_28: 'Implementation of the Living Aid Department building at Al-Jawf Airport',
        name_29: 'General development and improvement works in the passenger area of the Batha port',
        name_30: 'Maintenance of access control devices, electronic gates and security surveillance cameras',
        name_31: 'Maintenance and operation of the meeting hall of the Municipal Council of the Municipality of Al-Madinah Al-Munawwarah Region',
        name_32: 'Advanced security systems for the Riyadh gymnasium project',
        desc_1: 'Operation and cleaning project of the Ministry of Interior building in Riyadh by Almetrek Construction & Pledges Company, and the project will continue until 2025 AD',
        desc_2: 'It is one of the largest projects of the National Water Company, and provides a dewatering service. It is being implemented by Almetrek Logistics Services Company, and the project will continue until 2027 AD',
        desc_3: 'Provides the delivery of water and sewage services to citizens, and it is implemented by Almetrek Environmental Services Company, and the project will continue until 2025',
        desc_4: 'It provides the delivery of water and sanitation services to citizens and is implemented by Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_5: 'The project of delivering water from the treatment plant to the Hail Wild Park through a conveyor line with a diameter of 1200 mm and the construction of a treatment plant and a tank with a capacity of 5,000 cubic meters through Almetrek Construction & Pledges Company, and the project will continue until the date of 2023,',
        desc_6: 'Implementation of the replacement of water networks in the town of Al-Awamiya, Qatif Governorate, from the Almetrek Construction & Pledges Company, and the project was implemented and delivered in 2020 AD',
        desc_7: 'A project to complete the water fountains, a reservoir in the farm and a reservoir in the villages in Al-Baha, through the Almetrek Construction & Pledges Company, and the project will continue until 2023 AD',
        desc_8: 'The project of constructing Al-Hayel Village Road in the Tabuk region by Almetrek Construction & Pledges Company, and the project will continue until 2023 AD',
        desc_9: 'The project of operating, maintaining and cultivating the agricultural research station of King Abdulaziz University in Hada Al-Sham area and the educational nursery on the university campus through Almetrek Construction & Pledges Company, and the project will continue until 2024 AD',
        desc_10: 'Project, maintenance and cultivation of the Agricultural Research Station of King Faseel University in Al-Ahsa region through Almetrek Construction & Pledges Company and the project will continue until 2024AD',
        desc_11: 'A project for maintenance, cleanliness and operation of the buildings of the branches of the General Presidency for Scholarly Research and Ifta’ by Almetrek Construction & Pledges Company, and the project will continue until 2024 AD',
        desc_12: 'Operation and maintenance project of the Honeybee Industry Development Center in Wadi at the Ministry of Environment, Water and Agriculture through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_13: 'The project of operating and maintaining heavy equipment in the Municipality of Jeddah and insuring it in the northern municipalities through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_14: ': The project of operating and maintaining heavy equipment in the Municipality of Jeddah and insuring it within the scope of the southern municipalities through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_15: 'The project of operating and maintaining heavy equipment in the Municipality of Jeddah and insuring it within the central municipalities through  Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_16: 'Implementation of a project for the numbering and electronic registration of camels from Almetrek Environmental Services Company, and the project was implemented and delivered in 2020 AD',
        desc_17: 'A project for the maintenance and cleanliness of the control units in the Border Guard Directorate through  Almetrek Construction & Pledges Company, and the project will continue until the end of 2022 AD',
        desc_18: 'Insect control project at the Security Forces Hospital through Almetrek Environmental Services Company, and the project will continue until 2023 AD',
        desc_19: 'A project to get rid of rainwater and torrential rains collected in the guard buildings in different locations of the National Guard in Riyadh through Almetrek Logistics Services Company, and the project will continue until 2023 AD',
        desc_20: 'Maintenance, operation and cleanliness of the seed and seed center nurseries at the Ministry of Environment, Water and Agriculture through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_21: 'The project of transferring live means to a number of customs sites (land, air and sea) of the Zakat, Tax and Customs Authority through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_22: ': The project of prevention, control and fertilization of trees in gardens, parks and roads in Taif and its suburbs through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_23: 'Operation and Maintenance of Irrigation Networks Project at King Saud University by Almetrek Construction & Pledges Company, and the project will continue until the end of 2025 AD',
        desc_24: 'Operation, maintenance and cleanliness of the King Abdulaziz Center for Purebred Horses and Horse Pasture in Al Thumama by Almetrek Construction & Pledges Company, and the project will continue until the end of 2025 AD',
        desc_25: 'Environmental Sanitation Project to Reduce Aqoura in Taif Governorate and its affiliated villages through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_26: ': Home control project for dengue-carrying mosquitoes in the city of Taif and its affiliated villages through Almetrek Environmental Services Company, and the project will continue until 2025 AD',
        desc_27: 'Maintenance, operation, and cleaning of the buildings of the National Guard regiments in Dirab for a period of three years through Almetrek Construction & Pledges Company, and the project will continue until the end of 2025 AD',
        desc_28: 'Implementation of the building of the Living Means Department at Al-Jawf Airport affiliated to the Zakat, Tax and Customs Authority through Almetrek Construction & Pledges Company, and the project will continue until 2024 AD',
        desc_29: 'A project of general development and improvement works in the passenger area at the Batha port of the Zakat, Tax and Customs Authority through Almetrek Construction & Pledges Company, and the project will continue until 2024 AD',
        desc_30: 'The project of maintaining access control devices, electronic gates and security surveillance cameras of the Public Survey Authority through the Ghras Unyied Company, and the project will continue until 2024 AD',
        desc_31: 'Maintenance and operation of the meeting hall of the Municipal Council of the Municipality of Madinah Region through the Ghras Unyied Company, and the project will continue until 2024 AD',
        desc_32: 'A project to operate and develop advanced security systems for the gymnasium project in Riyadh through the Ghras Unyied Company, and the project will continue until 2024 AD',
      },

      teams: {
        title: 'Team work',
        desc: 'We are all leaders within our responsibility and are deeply committed to achieving pioneering results',
        name_1: 'Metrek bin Metrek Al Metrek',
        position_1: 'Chairman of Board of Directors',
        message_1: 'Pride is achieved when a person serves his country and his security, and thanks to God - the Most High - this wish has been achieved through many large projects in various governmental and commercial activities and sectors, carried out by the Almetrek Holding Group and for more than 20 years of effort by all parties in our beloved country and to achieve security and prosperity, the group, with God’s grace and success, participated in managing many public and private projects, and providing all its services to the Saudi Metrek',
        name_2: 'Dr. Majid Bin Metrek Almetrek',
        position_2: 'Deputy Chairman of the Board / Group CEO',
        message_2: 'There is no doubt that reaching the top begins with a step. On 9/2018 I was nominated by the Chairman of the Board of Directors to take over the tasks of the group that my father founded in 1999 AD, and because planting begins with a seed, I announced the challenge from this point with the aim of moving the company to absolute professionalism at all levels',
      },

      contact: {
        title: 'Communication',
        sub_title: 'With us',
        desc: 'We are ready to help you around the clock',
        phone_num: 'Mobile number',
        email: 'E-mail',
        address: 'address',
        location: 'Riyadh - Ring Road Exit 28',
      },

      v: {
        notvalid: `incorrect.`,
        required: `mandatory field.`,
        email: `email is incorrect.`,
        number: `Just a valid number.`
      },

      home: {
        title: `HOME`,
        name: 'Almetrek',
        website: 'company website',
        partners: 'Partners',
        sucess: 'Success',
        brands_1: 'Tags',
        brands_2: 'commercial',
        brands_desc: 'We look forward to the effective addition in this world, our capabilities qualify us to build giant edifices in the world of business and finance'
      },

      footer: {
        copyrights: 'All Rights reserved',
        company: 'Made in Prameg'
      }
    })
  })
}