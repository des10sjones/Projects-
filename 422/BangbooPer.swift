class BangbooManager {
    static func clearBangboos(context: NSManagedObjectContext) {
        let fetchRequest: NSFetchRequest<NSFetchRequestResult> = Bangboo.fetchRequest()
        let deleteRequest = NSBatchDeleteRequest(fetchRequest: fetchRequest)
        
        do {
            try context.execute(deleteRequest)
            try context.save()
        } catch {
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
    }
    
    static func populateBangboosIfNeeded(context: NSManagedObjectContext) {
        let fetchRequest: NSFetchRequest<Bangboo> = Bangboo.fetchRequest()
        do {
            let count = try context.count(for: fetchRequest)
            if count == 0 {
                populateBangboos(context: context)
            }
        } catch {
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
    }

    static func populateBangboos(context: NSManagedObjectContext) {
        guard let url = Bundle.main.url(forResource: "Bangboos", withExtension: "json") else {
            fatalError("Failed to locate Bangboos.json in app bundle.")
        }

        do {
            let data = try Data(contentsOf: url)
            let bangboos = try JSONDecoder().decode([BangbooData].self, from: data)

            for bangbooData in bangboos {
                let bangboo = Bangboo(context: context)
                bangboo.name = bangbooData.name
                bangboo.rank = bangbooData.rank
                
                // Assign skills descriptions and levels
                bangboo.skillA_name = bangbooData.skillA_name
                bangboo.skillA_type = bangbooData.skillA_type
                bangboo.skillA_description = bangbooData.skillA_description
                bangboo.skillA_maxLevel = Int16(bangbooData.skillA_maxLevel)
                
                bangboo.skillB_name = bangbooData.skillB_name
                bangboo.skillB_type = bangbooData.skillB_type
                bangboo.skillB_description = bangbooData.skillB_description
                bangboo.skillB_maxLevel = Int16(bangbooData.skillB_maxLevel)
                
                bangboo.skillC_name = bangbooData.skillC_name
                bangboo.skillC_type = bangbooData.skillC_type
                bangboo.skillC_description = bangbooData.skillC_description
                bangboo.skillC_maxLevel = Int16(bangbooData.skillC_maxLevel)
                
                // Load and set the image
                
                if let image = UIImage(named: bangbooData.image), let imageData = image.pngData() {
                                  bangboo.image = imageData
                    }
            }

            // Save context after adding all bangboos
            do {
                try context.save()
                print("Successfully saved bangboos to Core Data.")
            } catch {
                print("Failed to save context: \(error.localizedDescription)")
            }
        } catch {
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
    }
}
struct BangbooData: Codable {
    let name: String
    let rank: String
    let skillA_name: String
    let skillA_type: String
    let skillA_description: String
    let skillA_maxLevel: Int
    let skillB_name: String
    let skillB_type: String
    let skillB_description: String
    let skillB_maxLevel: Int
    let skillC_name: String
    let skillC_type: String
    let skillC_description: String
    let skillC_maxLevel: Int
    let image: String
}

