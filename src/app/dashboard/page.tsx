// "use client";

// import { useState, useEffect } from "react";
// import { getProfiles, createProfile, updateProfile, deleteProfile } from "@/app/actions/profiles";

// type Profile = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   birthDate: string;
//   photoUrl?: string;
//   description?: string;
//   createdById: number;
//   createdAt: string;
//   updatedAt: string;
// };

// export default function Dashboard() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [newProfile, setNewProfile] = useState<Partial<Profile>>({});
//   const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
//   const [userId, setUserId] = useState<number | null>(null);

//   useEffect(() => {
//     async function fetchAuthData() {
//       const res = await fetch("/api/auth/me", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setUserId(data.userId);
//       } else {
//         alert("Unauthorized! Please log in.");
//         window.location.href = "/auth";
//       }
//     }

//     fetchAuthData();
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getProfiles();
//       setProfiles(
//         data.map((profile) => ({
//           ...profile,
//           birthDate: new Date(profile.birthDate).toISOString().split("T")[0],
//           createdAt: new Date(profile.createdAt).toISOString(),
//           updatedAt: new Date(profile.updatedAt).toISOString(),
//           photoUrl: profile.photoUrl || undefined,
//           description: profile.description || undefined,
//         }))
//       );
//     }
//     fetchData();
//   }, []);

//   async function handleAddOrUpdate() {
//     if (!newProfile.firstName || !newProfile.lastName || !newProfile.birthDate || !userId) {
//       alert("Vyplňte všetky povinné polia!");
//       return;
//     }

//     if (editingProfile) {
//       // Update profile
//       const updated = await updateProfile(editingProfile.id, {
//         firstName: newProfile.firstName!,
//         lastName: newProfile.lastName!,
//         birthDate: new Date(newProfile.birthDate).toISOString(),
//         photoUrl: newProfile.photoUrl || undefined,
//         description: newProfile.description || undefined,
//       });

//       setProfiles((prevProfiles) =>
//         prevProfiles.map((profile) =>
//           profile.id === updated.id
//             ? {
//                 ...updated,
//                 birthDate: new Date(updated.birthDate).toISOString().split("T")[0],
//                 createdAt: new Date(updated.createdAt).toISOString(),
//                 updatedAt: new Date(updated.updatedAt).toISOString(),
//                 photoUrl: updated.photoUrl || undefined,
//                 description: updated.description || undefined,
//               }
//             : profile
//         )
//       );
//       setEditingProfile(null);
//     } else {
//       // Add new profile
//       const created = await createProfile({
//         firstName: newProfile.firstName!,
//         lastName: newProfile.lastName!,
//         birthDate: new Date(newProfile.birthDate).toISOString(),
//         photoUrl: newProfile.photoUrl || undefined,
//         description: newProfile.description || undefined,
//         createdById: userId!,
//       });

//       setProfiles((prevProfiles) => [
//         ...prevProfiles,
//         {
//           ...created,
//           birthDate: new Date(created.birthDate).toISOString().split("T")[0],
//           createdAt: new Date(created.createdAt).toISOString(),
//           updatedAt: new Date(created.updatedAt).toISOString(),
//           photoUrl: created.photoUrl || undefined,
//           description: created.description || undefined,
//         },
//       ]);
//     }

//     setNewProfile({});
//   }

//   async function handleDelete(id: number) {
//     await deleteProfile(id);
//     setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
//   }

//   function handleEdit(profile: Profile) {
//     setEditingProfile(profile);
//     setNewProfile(profile);
//   }

//   function handleCancelEdit() {
//     setEditingProfile(null);
//     setNewProfile({});
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Správa Profilov</h1>

//         <div className="bg-blue-50 p-6 rounded-md mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             {editingProfile ? "Upraviť profil" : "Pridať nový profil"}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <input
//               type="text"
//               placeholder="Meno"
//               value={newProfile.firstName || ""}
//               onChange={(e) => setNewProfile({ ...newProfile, firstName: e.target.value })}
//               className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
//             />
//             <input
//               type="text"
//               placeholder="Priezvisko"
//               value={newProfile.lastName || ""}
//               onChange={(e) => setNewProfile({ ...newProfile, lastName: e.target.value })}
//               className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
//             />
//             <input
//               type="date"
//               value={newProfile.birthDate || ""}
//               onChange={(e) => setNewProfile({ ...newProfile, birthDate: e.target.value })}
//               className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
//             />
//             <input
//               type="text"
//               placeholder="URL fotky"
//               value={newProfile.photoUrl || ""}
//               onChange={(e) => setNewProfile({ ...newProfile, photoUrl: e.target.value })}
//               className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
//             />
//           </div>
//           <textarea
//             placeholder="Popis"
//             value={newProfile.description || ""}
//             onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
//             className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 mb-4"
//             rows={4}
//           ></textarea>
//           <div className="flex gap-4">
//             <button
//               onClick={handleAddOrUpdate}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
//             >
//               {editingProfile ? "Upraviť" : "Pridať"}
//             </button>
//             {editingProfile && (
//               <button
//                 onClick={handleCancelEdit}
//                 className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition duration-300 font-semibold"
//               >
//                 Zrušiť
//               </button>
//             )}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Existujúce profily</h2>
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {profiles.map((profile) => (
//               <li
//                 key={profile.id}
//                 className="bg-gray-100 shadow-sm rounded-md p-6 border border-gray-300 flex flex-col justify-between"
//               >
//                 <div>
//                   {profile.photoUrl && (
//                     <img
//                       src={profile.photoUrl}
//                       alt={`${profile.firstName} ${profile.lastName}`}
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                     />
//                   )}
//                   <p className="font-bold text-gray-800 text-xl mb-2">
//                     {profile.firstName} {profile.lastName}
//                   </p>
//                   <p className="text-gray-600 text-sm mb-1">Dátum narodenia: {profile.birthDate}</p>
//                   <p className="text-gray-600 text-sm">{profile.description}</p>
//                 </div>
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(profile)}
//                     className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
//                   >
//                     Upraviť
//                   </button>
//                   <button
//                     onClick={() => handleDelete(profile.id)}
//                     className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
//                   >
//                     Odstrániť
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "@/app/actions/profiles";

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  photoUrl?: string;
  description?: string;
  createdById: number;
  createdAt: string;
  updatedAt: string;
};

export default function Dashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfile, setNewProfile] = useState<Partial<Profile>>({});
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  // is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch logged-in user's ID
  useEffect(() => {
    async function fetchAuthData() {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserId(data.userId);
        setIsAuthenticated(true);
      } else {
        window.location.href = "/auth";
      }
    }

    fetchAuthData();
  }, []);

  // Fetch profiles data
  useEffect(() => {
    async function fetchData() {
      const response = await getProfiles();

      if (response.success && response.data) {
        setProfiles(
          response.data.map((profile) => ({
            ...profile,
            birthDate: new Date(profile.birthDate).toISOString().split("T")[0],
            createdAt: new Date(profile.createdAt).toISOString(),
            updatedAt: new Date(profile.updatedAt).toISOString(),
            photoUrl: profile.photoUrl || undefined,
            description: profile.description || undefined,
          }))
        );
      } else {
        alert(response.message || "Failed to fetch profiles.");
      }
    }

    fetchData();
  }, []);

  // Add or update a profile
  async function handleAddOrUpdate() {
    if (!newProfile.firstName || !newProfile.lastName || !newProfile.birthDate || !userId) {
      alert("Vyplňte všetky povinné polia!");
      return;
    }

    try {
      if (editingProfile) {
        const response = await updateProfile(editingProfile.id, {
          firstName: newProfile.firstName!,
          lastName: newProfile.lastName!,
          birthDate: new Date(newProfile.birthDate).toISOString(),
          photoUrl: newProfile.photoUrl || undefined,
          description: newProfile.description || undefined,
        });

        if ("data" in response && response.success && response.data) {
          const createdProfile = {
            ...response.data,
            birthDate: new Date(response.data.birthDate).toISOString().split("T")[0],
            createdAt: new Date(response.data.createdAt).toISOString(),
            updatedAt: new Date(response.data.updatedAt).toISOString(),
            photoUrl: response.data.photoUrl || undefined,
            description: response.data.description || undefined,
          };

          setProfiles((prevProfiles) => [...prevProfiles, createdProfile]);
        } else {
          alert("Profile creation failed.");
        }

        setEditingProfile(null);
      } else {
        const response = await createProfile({
          firstName: newProfile.firstName!,
          lastName: newProfile.lastName!,
          birthDate: new Date(newProfile.birthDate).toISOString(),
          photoUrl: newProfile.photoUrl || undefined,
          description: newProfile.description || undefined,
          createdById: userId!,
        });

        if ("data" in response && response.success && response.data) {
          const createdProfile = {
            ...response.data,
            birthDate: new Date(response.data.birthDate).toISOString().split("T")[0],
            createdAt: new Date(response.data.createdAt).toISOString(),
            updatedAt: new Date(response.data.updatedAt).toISOString(),
            photoUrl: response.data.photoUrl || undefined,
            description: response.data.description || undefined,
          };

          setProfiles((prevProfiles) => [...prevProfiles, createdProfile]);
        } else {
          alert("Profile creation failed.");
        }
      }

      setNewProfile({});
    } catch (error) {
      console.error("Error in handleAddOrUpdate:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // Delete a profile
  async function handleDelete(id: number) {
    try {
      const response = await deleteProfile(id);

      if (response.success) {
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
      } else {
        alert(response.message || "Failed to delete the profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete the profile.");
    }
  }

  // Handle profile edit
  function handleEdit(profile: Profile) {
    setEditingProfile(profile);
    setNewProfile(profile);
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingProfile(null);
    setNewProfile({});
  }

  return (
    <>
      {!isAuthenticated ? (
        <div className="text-center text-red-500">Unauthorized! Please log in.</div>
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Správa Profilov</h1>

            <div className="bg-blue-50 p-6 rounded-md mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {editingProfile ? "Upraviť profil" : "Pridať nový profil"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Meno"
                  value={newProfile.firstName || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, firstName: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Priezvisko"
                  value={newProfile.lastName || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, lastName: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
                />
                <input
                  type="date"
                  value={newProfile.birthDate || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, birthDate: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
                />
                <input
                  type="text"
                  placeholder="URL fotky"
                  value={newProfile.photoUrl || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, photoUrl: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
                />
              </div>
              <textarea
                placeholder="Popis"
                value={newProfile.description || ""}
                onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 mb-4"
                rows={4}
              ></textarea>
              <div className="flex gap-4">
                <button
                  onClick={handleAddOrUpdate}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  {editingProfile ? "Upraviť" : "Pridať"}
                </button>
                {editingProfile && (
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition duration-300 font-semibold"
                  >
                    Zrušiť
                  </button>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Existujúce profily</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profiles.map((profile) => (
                  <li
                    key={profile.id}
                    className="bg-gray-100 shadow-sm rounded-md p-6 border border-gray-300 flex flex-col justify-between"
                  >
                    <div>
                      {profile.photoUrl && (
                        <img
                          src={profile.photoUrl}
                          alt={`${profile.firstName} ${profile.lastName}`}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                      )}
                      <p className="font-bold text-gray-800 text-xl mb-2">
                        {profile.firstName} {profile.lastName}
                      </p>
                      <p className="text-gray-600 text-sm mb-1">Dátum narodenia: {profile.birthDate}</p>
                      <p className="text-gray-600 text-sm">{profile.description}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(profile)}
                        className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                      >
                        Upraviť
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Odstrániť
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
