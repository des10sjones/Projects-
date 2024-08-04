import SwiftUI
import CoreData

struct BangboosView: View {
    @FetchRequest(
        entity: Bangboo.entity(),
        sortDescriptors: [NSSortDescriptor(keyPath: \Bangboo.name, ascending: true)]
    ) var bangboos: FetchedResults<Bangboo>

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 20) {
                ForEach(bangboos, id: \.self) { bangboo in
                    NavigationLink(destination: BangbooDetailView(bangboo: bangboo)) {
                        BangbooRowView(bangboo: bangboo)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .padding()
        }
        .navigationTitle("Bangboos")
    }
}

struct BangbooRowView: View {
    let bangboo: Bangboo

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            if let imageData = bangboo.image, let uiImage = UIImage(data: imageData) {
                Image(uiImage: uiImage)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(height: 150)
                    .clipped()
                    .cornerRadius(10)
            } else {
                Image(systemName: "photo")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(height: 150)
                    .foregroundColor(.gray)
                    .clipped()
                    .cornerRadius(10)
            }
            Text(bangboo.name ?? "Unknown")
                .font(.title2)
                .fontWeight(.bold)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text("Rank: \(bangboo.rank ?? "Unknown")")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(bangboo.skillA_description ?? "No description available.")
                .font(.body)
                .foregroundColor(.secondary)
                .lineLimit(3)
                .truncationMode(.tail)
                .frame(maxWidth: .infinity, alignment: .leading)
            Spacer()
        }
        .padding()
        .frame(maxWidth: .infinity, minHeight: 150)
        .background(Color.white)
        .cornerRadius(10)
        .shadow(color: .gray, radius: 5, x: 0, y: 2)
    }
}

struct BangbooDetailView: View {
    let bangboo: Bangboo

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text(bangboo.name ?? "Unknown")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                if let imageData = bangboo.image, let uiImage = UIImage(data: imageData) {
                    Image(uiImage: uiImage)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxHeight: 200)
                        .cornerRadius(10)
                        .shadow(radius: 5)
                } else {
                    Image(systemName: "photo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxHeight: 200)
                        .foregroundColor(.gray)
                        .cornerRadius(10)
                        .shadow(radius: 5)
                }

                BangbooDetailSection(title: "Rank", content: bangboo.rank ?? "Unknown")
                
                BangbooDetailSection(title: "Skill A - \(bangboo.skillA_name ?? "Unknown")", content: """
                    Type: \(bangboo.skillA_type ?? "Unknown")
                    Description: \(bangboo.skillA_description ?? "Unknown")
                    Max Level: \(bangboo.skillA_maxLevel)
                    """)
                
                BangbooDetailSection(title: "Skill B - \(bangboo.skillB_name ?? "Unknown")", content: """
                    Type: \(bangboo.skillB_type ?? "Unknown")
                    Description: \(bangboo.skillB_description ?? "Unknown")
                    Max Level: \(bangboo.skillB_maxLevel)
                    """)
                
                BangbooDetailSection(title: "Skill C - \(bangboo.skillC_name ?? "Unknown")", content: """
                    Type: \(bangboo.skillC_type ?? "Unknown")
                    Description: \(bangboo.skillC_description ?? "Unknown")
                    Max Level: \(bangboo.skillC_maxLevel)
                    """)
                
                Spacer()
            }
            .padding()
            .frame(maxWidth: .infinity)
        }
        .navigationTitle("Bangboo Details")
    }
}

struct BangbooDetailSection: View {
    let title: String
    let content: String

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.title2)
                .fontWeight(.bold)
                .frame(maxWidth: .infinity, alignment: .leading)

            Text(content)
                .font(.body)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
        .frame(maxWidth: .infinity, minHeight: 100)
        .background(RoundedRectangle(cornerRadius: 10)
            .fill(Color(.systemBackground))
            .shadow(radius: 5))
    }
}

#Preview {
    BangboosView().environment(\.managedObjectContext, PersistenceController.preview.container.viewContext)
}
