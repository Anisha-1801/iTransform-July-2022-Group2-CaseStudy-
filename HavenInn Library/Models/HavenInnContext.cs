using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class HavenInnContext : DbContext
    {
        public HavenInnContext()
        {
        }

        public HavenInnContext(DbContextOptions<HavenInnContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bill> Bill { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Guest> Guest { get; set; }
        public virtual DbSet<Inventory> Inventory { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<Room> Room { get; set; }
        public virtual DbSet<RoomType> RoomType { get; set; }
        public virtual DbSet<Services> Services { get; set; }
        public virtual DbSet<Staff> Staff { get; set; }
        public virtual DbSet<User> User { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=DESKTOP-NDRR8I3\\MSSQLSERVER01;Initial Catalog=HavenInn;Integrated Security=True");
//            }
//        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<Bill>(entity =>
//            {
//                entity.Property(e => e.PaymentMode)
//                    .HasMaxLength(20)
//                    .IsUnicode(false);

//                entity.Property(e => e.PaymentTime)
//                    .HasColumnName("paymentTime")
//                    .HasColumnType("datetime");

//                entity.Property(e => e.Status)
//                    .HasMaxLength(50)
//                    .IsUnicode(false);

//                entity.Property(e => e.TotalPrice).HasColumnType("decimal(16, 2)");

//                entity.Property(e => e.TransactionId)
//                    .HasMaxLength(255)
//                    .IsUnicode(false);
//            });

//            modelBuilder.Entity<Department>(entity =>
//            {
//                entity.Property(e => e.DepartmentName)
//                    .HasMaxLength(255)
//                    .IsUnicode(false);
//            });

//            modelBuilder.Entity<Guest>(entity =>
//            {
//                entity.Property(e => e.Email).HasMaxLength(100);

//                entity.Property(e => e.MobileNo)
//                    .HasMaxLength(10)
//                    .IsUnicode(false);

//                entity.Property(e => e.Name)
//                    .HasMaxLength(255)
//                    .IsUnicode(false);
//            });

//            modelBuilder.Entity<Inventory>(entity =>
//            {
//                entity.Property(e => e.Category)
//                    .HasMaxLength(20)
//                    .IsUnicode(false);

//                entity.Property(e => e.IsStockAvailable).HasColumnName("isStockAvailable");

//                entity.Property(e => e.Item)
//                    .HasMaxLength(100)
//                    .IsUnicode(false);

//                entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 0)");

//                entity.HasOne(d => d.User)
//                    .WithMany(p => p.Inventory)
//                    .HasForeignKey(d => d.UserId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Inventory_User");
//            });

//            modelBuilder.Entity<Reservation>(entity =>
//            {
//                entity.Property(e => e.CheckIn).HasColumnType("datetime");

//                entity.Property(e => e.CheckOut).HasColumnType("datetime");

//                entity.Property(e => e.NoOfNights).HasColumnName("noOfNights");

//                entity.Property(e => e.NumberOfAdults).HasColumnName("numberOfAdults");

//                entity.Property(e => e.NumberOfChildren).HasColumnName("numberOfChildren");

//                entity.Property(e => e.ServiceId).HasColumnName("ServiceID");

//                entity.HasOne(d => d.Guest)
//                    .WithMany(p => p.Reservation)
//                    .HasForeignKey(d => d.GuestId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Reservation_Guest");

//                entity.HasOne(d => d.Room)
//                    .WithMany(p => p.Reservation)
//                    .HasForeignKey(d => d.RoomId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Reservation_Room");

//                entity.HasOne(d => d.Service)
//                    .WithMany(p => p.Reservation)
//                    .HasForeignKey(d => d.ServiceId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Reservation_Services");

//                entity.HasOne(d => d.User)
//                    .WithMany(p => p.Reservation)
//                    .HasForeignKey(d => d.UserId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Reservation_User");
//            });

//            modelBuilder.Entity<Room>(entity =>
//            {
//                entity.Property(e => e.RoomId).ValueGeneratedNever();

//                entity.Property(e => e.Description)
//                    .HasMaxLength(255)
//                    .IsUnicode(false);

//                entity.Property(e => e.IsAvailable).HasColumnName("isAvailable");

//                entity.HasOne(d => d.RoomType)
//                    .WithMany(p => p.Room)
//                    .HasForeignKey(d => d.RoomTypeId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Room_RoomType");
//            });

//            modelBuilder.Entity<RoomType>(entity =>
//            {
//                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

//                entity.Property(e => e.RoomType1)
//                    .HasColumnName("RoomType")
//                    .HasMaxLength(255)
//                    .IsUnicode(false);
//            });

//            modelBuilder.Entity<Services>(entity =>
//            {
//                entity.HasKey(e => e.ServiceId)
//                    .HasName("PK__Services__C51BB00A1548ED43");

//                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

//                entity.Property(e => e.ServiceName)
//                    .HasMaxLength(20)
//                    .IsUnicode(false);
//            });

//            modelBuilder.Entity<Staff>(entity =>
//            {
//                entity.HasIndex(e => e.Email)
//                    .HasName("UQ__Staff__A9D1053472B599B0")
//                    .IsUnique();

//                entity.Property(e => e.Address)
//                    .HasMaxLength(255)
//                    .IsUnicode(false);

//                entity.Property(e => e.Dob)
//                    .HasColumnName("DOB")
//                    .HasColumnType("date");

//                entity.Property(e => e.Doj)
//                    .HasColumnName("DOJ")
//                    .HasColumnType("date");

//                entity.Property(e => e.Email).HasMaxLength(50);

//                entity.Property(e => e.FirstName)
//                    .HasMaxLength(100)
//                    .IsUnicode(false);

//                entity.Property(e => e.Gender)
//                    .HasMaxLength(10)
//                    .IsUnicode(false);

//                entity.Property(e => e.LastName)
//                    .HasMaxLength(100)
//                    .IsUnicode(false);

//                entity.Property(e => e.MobileNumber)
//                    .HasMaxLength(10)
//                    .IsUnicode(false);

//                entity.Property(e => e.Salary).HasColumnType("decimal(8, 2)");

//                entity.HasOne(d => d.Department)
//                    .WithMany(p => p.Staff)
//                    .HasForeignKey(d => d.DepartmentId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_Staff_Department");
//            });

//            modelBuilder.Entity<User>(entity =>
//            {
//                entity.HasIndex(e => e.Email)
//                    .HasName("UQ__User__A9D10534A25B0423")
//                    .IsUnique();

//                entity.Property(e => e.Email).HasMaxLength(50);

//                entity.Property(e => e.Password).HasMaxLength(255);

//                entity.Property(e => e.Role)
//                    .HasMaxLength(20)
//                    .IsUnicode(false);

//                entity.HasOne(d => d.Staff)
//                    .WithMany(p => p.User)
//                    .HasForeignKey(d => d.StaffId)
//                    .OnDelete(DeleteBehavior.SetNull)
//                    .HasConstraintName("FK_User_Staff");
//            });

//            OnModelCreatingPartial(modelBuilder);
//        }

//        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
