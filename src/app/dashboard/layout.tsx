"use client"

import { Disclosure, DisclosureButton } from "@headlessui/react"
import { LogoutIcon } from "@heroicons/react/outline"
import {
  DocumentIcon,
  HomeIcon,
  RefreshIcon,
  UserIcon,
} from "@heroicons/react/solid"
import { deleteCookie } from "cookies-next"
import { SessionProvider, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Beranda", icon: HomeIcon, href: "/dashboard", children: [] },
  {
    name: "Kegiatan",
    icon: DocumentIcon,
    href: "/dashboard/kegiatan",
    children: [],
  },
  {
    name: "Panen",
    icon: DocumentIcon,
    href: "/dashboard/panen",
    children: [],
  },
  {
    name: "Penjualan",
    icon: DocumentIcon,
    href: "/dashboard/penjualan",
    children: [],
  },
  {
    name: "Riwayat",
    icon: DocumentIcon,
    href: "/dashboard/riwayat",
    children: [],
  },
]

const handleSignOut = async () => {
  await signOut()
  deleteCookie("selected-commodity")
  deleteCookie("farmer")
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const farmerId = searchParams.get("farmer_land_id")
    if (!farmerId) {
      router.push("/")
    }
  }, [pathname])

  return (
    <SessionProvider>
      <main className="mx-4">
        {/* <LoadingApp show={loadingApp} /> */}
        <div className="flex flex-col">
          <div className={`flex flex-row relative`}>
            <div
              className={`fixed left-0 py-6 overflow-y-scroll no-scrollbar w-[220px] shadow-sidebar border-r-[1px] border-[#EEEEEE] h-screen`}
            >
              <div className="flex flex-col w-full items-center ">
                {/* <ChipUser
                className="mx-6"
                profilePicture={dataUser.profile_picture || null}
                name={dataUser.name || ""}
                subName={dataUser.role === "farmer" ? "Petani" : "Pemerintah"}
              /> */}

                <div className="flex w-full mt-6 flex-col justify-start">
                  {navigation.map((item) =>
                    item.children.length != 0 ? (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            pathname.includes(item.href)
                              ? "bg-tand-9 text-tand-5 "
                              : "bg-white text-tand-appr-1 hover:bg-gray-50",
                            item.name === "Data Lahan"
                              ? "dashboard-data-lahan"
                              : "",
                            "group w-full flex gap-x-2 items-center py-3 px-6 text-sm font-semibold"
                          )}
                        >
                          <item.icon className="h-6 w-6" />
                          <span>{item.name}</span>
                        </Link>
                      </div>
                    ) : (
                      <Disclosure
                        as="div"
                        key={item.name}
                        className={`space-y-1`}
                        defaultOpen={true}
                      >
                        {({ open }) => (
                          <>
                            <DisclosureButton
                              className={classNames(
                                pathname == item.href
                                  ? "w-full bg-tand-9 text-tand-5"
                                  : "w-full bg-white text-tand-appr-1 hover:bg-gray-50",
                                "group  py-3 px-6 text-sm font-semibold"
                              )}
                            >
                              <div
                                className={`flex w-full  gap-x-2 items-center ${
                                  item.name == "Siklus Tanam"
                                    ? "data-lahan-step-2"
                                    : ""
                                }`}
                              >
                                <item.icon className="h-6 w-6" />
                                <Link
                                  href={`${
                                    item.href
                                  }?farmer_land_id=${searchParams.get(
                                    "farmer_land_id"
                                  )}`}
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </DisclosureButton>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}

                  <div className=" h-[1px] bg-[#EEEEEE] my-4 mx-6" />
                  <Link
                    href="/profil"
                    className={classNames(
                      "bg-white text-tand-appr-1 hover:bg-gray-50",
                      "group w-full flex gap-x-2 items-center py-3 px-6 text-sm font-semibold"
                    )}
                  >
                    <UserIcon className="h-6 w-6" />
                    <span>Profil</span>
                  </Link>
                  <Link
                    href="/ubah_kata_sandi"
                    className={classNames(
                      "bg-white text-tand-appr-1 hover:bg-gray-50",
                      "group w-full flex gap-x-2 items-center py-3 px-6 text-sm font-semibold"
                    )}
                  >
                    <RefreshIcon className="h-6 w-6" />
                    <span>Ubah Kata Sandi</span>
                  </Link>
                  <span
                    onClick={handleSignOut}
                    className={classNames(
                      "bg-white text-tand-appr-1 mt-2 hover:bg-gray-50",
                      "group cursor-pointer w-full flex gap-x-2 items-center py-3 px-6 text-sm font-semibold"
                    )}
                  >
                    <LogoutIcon className="h-6 w-6" />
                    <span>Keluar</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="grow h-screen ml-[220px]">{children}</div>
          </div>
        </div>
      </main>
    </SessionProvider>
  )
}
